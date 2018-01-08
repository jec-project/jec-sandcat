//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {HttpRequest, HttpResponse, HttpJslet, JsletContext} from "jec-exchange";
import {HttpStatusCode, HttpMethod, HttpHeader} from "jec-commons";
import {ResourceJsletProxy} from "./ResourceJsletProxy";
import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {MethodDescriptor} from "../reflect/MethodDescriptor";
import {ResponseHandlerBuilder} from "../builders/ResponseHandlerBuilder";
import {UrlPatternMapperBuilder} from "../builders/UrlPatternMapperBuilder";
import {UrlPatternMapper} from "../core/UrlPatternMapper";
import {UrlPatternMatcher} from "../core/UrlPatternMatcher";
import {ParameterInjector} from "../reflect/ParameterInjector";
import {SandcatError} from "../exceptions/SandcatError";
import {JsletMethod} from "../reflect/JsletMethod";
import {JsletMethodDescriptor} from "../reflect/JsletMethodDescriptor";
import {Sandcat} from "../Sandcat";
import {RequestPropertiesBuilder} from "../builders/RequestPropertiesBuilder";
import {RequestProperties} from "../utils/RequestProperties";
import {HttpHeadersValidator} from "../utils/HttpHeadersValidator";
import {SandcatLocaleManager} from "../i18n/SandcatLocaleManager";
import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";

/**
 * The <code>SandcatResourceJsletProxy</code> class is te default implementation 
 * for the <code>ResourceJsletProxy</code> interface in the Sandcat framework.
 */
export class SandcatResourceJsletProxy extends HttpJslet
                                       implements ResourceJsletProxy {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SandcatResourceJsletProxy</code> instance.
   */
  constructor() {
    super();
    this.initObj();
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The resource associated with this <code>ResourceJsletProxy</code>.
   */
  private _resource:any = null;

  /**
   * The list of URL patterns associated with this <code>Jslet</code>.
   */
  private _urlPatterns:string[] = null;

  /**
   * The name of this <code>Jslet</code>.
   */
  private _name:string = null;

  /**
   * The helper object that creates callback handler functions.
   */
  private _handlerBuilder:ResponseHandlerBuilder = null;

  /**
   * The helper object that performs mapping between URL patterns and the 
   * resource object.
   */
  private _urlPatternMapper:UrlPatternMapper = null;

  /**
   * The helper object that injects parameters into a resource object method.
   */
  private _paramInjector:ParameterInjector = null;

  /**
   * The helper object that creates new <code>RequestProperties</code> instances.
   */
  private _requestPropertiesBuilder:RequestPropertiesBuilder = null;

  /**
   * The helper object that validates HTTP header parameters for the current
   * transaction.
   */
  private _httpHeadersValidator:HttpHeadersValidator = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._handlerBuilder = new ResponseHandlerBuilder();
    this._paramInjector = new ParameterInjector();
    this._requestPropertiesBuilder = new RequestPropertiesBuilder();
    this._httpHeadersValidator = new HttpHeadersValidator();
  }

  /**
   * Compute operations for sending correct parameters to the right resource
   * method, depending on the HTTP metho and the UIR sub-route.
   *
   * @param {number} jsletMethod the current HTTP transaction. Valid values are
   *                            the constants of the <code>HttpMethod</code>
   *                            class.
   */
  private processJsletOperation(jsletMethod:number):void {
    let action:Function = null;
    let operation:JsletMethodDescriptor = this._resource.getResourceDescriptor()
                                                        .jsletMethodsMap
                                                        .get(jsletMethod);
    if(operation) {
      action = operation.action;
      action.apply(this._resource);
    }
  }

  /**
   * Exits the current HTTP request, whith a 
   * <code>HttpStatusCode.NOT_FOUND</code> status, when no mapped method is
   * defined.
   *
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                           transaction.
   * @param {Function} exit the function used by the container to handle
   *                        asynchronous answers for this jslet.
   */
  private doNotFound(req:HttpRequest, res:HttpResponse, 
                exit:(req:HttpRequest, res:HttpResponse, data:any)=>void):void {
    exit(req, res.sendStatus(HttpStatusCode.NOT_FOUND), null);
  }

  /**
   * Compute operations for sending correct parameters to the right resource
   * method, depending on the HTTP metho and the UIR sub-route.
   *
   * @param {string} httpMethod the current HTTP transaction. Valid values are
   *                            the constants of the <code>HttpMethod</code>
   *                            class.
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                           transaction.
   * @param {Function} exit the function used by the container to handle
   *                        asynchronous answers for this jslet.
   */
  private processOperation(httpMethod:string, req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    let action:Function = null;
    let responseHandler:Function = null;
    let operation:MethodDescriptor = null;
    let descriptor:ResourceDescriptor = this._resource.getResourceDescriptor();
    let requestProperties:RequestProperties =
                          this._requestPropertiesBuilder.build(httpMethod, req);
    let patternMatcher:UrlPatternMatcher =
                         this._urlPatternMapper.matchRequest(requestProperties);
    let parameters:any[] = null;
    let operationStatus:number = -1;
    let header:string = null;
    if(patternMatcher) {
      operation = descriptor.methodsMap
                              .get(patternMatcher.descriptor.getMappedMethod());
    }
    if(operation) {
      header = descriptor.produces;
      if(header) {
        res.setHeader(HttpHeader.CONTENT_TYPE, header);
      }
      header = descriptor.crossDomainPolicy;
      if(header) {
        res.setHeader(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, header);
      }
      //TODO: add descriptor.consumes support
      //TODO: implement a singleton helper to factorize such actions :
      //      header = descriptor.produces;
      //      res.setHeader(HttpHeader.CONTENT_TYPE, header);
      operationStatus =
              this._httpHeadersValidator.validate(operation, requestProperties);
      if(operationStatus === HttpStatusCode.OK) {
        responseHandler = this._handlerBuilder.build(req, res, exit);
        parameters = this._paramInjector.buildParameters(
          patternMatcher, responseHandler, operation, req
        );
        action = operation.action;
        header = operation.produces;
        if(header) {
          res.setHeader(HttpHeader.CONTENT_TYPE, header);
        }
        header = operation.crossDomainPolicy;
        if(header) {
          res.setHeader(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, header);
        }
        action.apply(this._resource, parameters);
      } else {
        exit(req, res.sendStatus(operationStatus), null);
      }
    } else {
      this.doNotFound(req, res, exit);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getResource():any {
    return this._resource;
  }

  /**
   * @inheritDoc
   */
  public setResource(resource:any):void {
    let mapperBuilder:UrlPatternMapperBuilder = new UrlPatternMapperBuilder();
    let descriptor:ResourceDescriptor = resource.getResourceDescriptor();
    let resourceName:string = resource.constructor.name;
    let message:string = null;
    if(!descriptor){
      message = SandcatLocaleManager.getInstance()
                                    .get("errors.descriptor", resourceName);
      SandcatLoggerProxy.getInstance().log(message);
      throw new SandcatError(message);
    }
    this._resource = resource;
    this._name = resourceName;
    this._urlPatterns = descriptor.urlPatterns;
    this._urlPatternMapper = mapperBuilder.build(descriptor);
  }

  /**
   * @override
   */
  public getUrlPatterns():string[] {
     return this._urlPatterns;
  }

  /**
   * @override
   */
  public getName():string {
     return this._name;
  }

  /**
   * @inheritDoc
   */
  public init():void {
    this.processJsletOperation(JsletMethod.INIT);
  }

  /**
   * @inheritDoc
   */
  public destroy():void {
    this.processJsletOperation(JsletMethod.DESTROY);
  }
  
  /**
   * @inheritDoc
   */
  public before():void {
    this.processJsletOperation(JsletMethod.BEFORE);
  }

  /**
   * @inheritDoc
   */
  public after():void {
    this.processJsletOperation(JsletMethod.AFTER);
  }

  /**
   * @inheritDoc
   */
  public doDelete(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.DELETE, req, res, exit);
  }

  /**
   * @inheritDoc
   */
  public doGet(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.GET, req, res, exit);
  }

  /**
   * @inheritDoc
   */
  public doOptions(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.OPTIONS, req, res, exit);
  }

  /**
   * @inheritDoc
   */
  public doTrace(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.TRACE, req, res, exit);
  }

  /**
   * @inheritDoc
   */
  public doHead(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.HEAD, req, res, exit);
  }
  
  /**
   * @inheritDoc
   */
  public doConnect(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.CONNECT, req, res, exit);
  }

  /**
   * @inheritDoc
   */
  public doPut(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.PUT, req, res, exit);
  }
  
  /**
   * @inheritDoc
   */
  public doPost(req:HttpRequest, res:HttpResponse, 
              exit:(req:HttpRequest, res:HttpResponse, data:any) => void):void {
    this.processOperation(HttpMethod.POST, req, res, exit);
  }
}
