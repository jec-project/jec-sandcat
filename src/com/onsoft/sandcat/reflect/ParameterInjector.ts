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

import {MethodDescriptor} from "./MethodDescriptor";
import {ParameterDescriptor} from "./ParameterDescriptor";
import {AnnotationType} from "./AnnotationType";
import {HttpRequest} from "jec-exchange";
import {UrlPatternMatcher} from "../core/UrlPatternMatcher";
import {SandcatError} from "../exceptions/SandcatError";
import {SandcatLocaleManager} from "../i18n/SandcatLocaleManager";
import {AnnotationTypeUtil} from "../utils/AnnotationTypeUtil";

/**
 * The <code>ParameterInjector</code> class provides functionalities for 
 * injecting the values of parameters passed in the signature of a Sandcat
 * resource method.r
 */
export class ParameterInjector {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ParameterInjector</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Builds and returns an array that contains the parameter for a HTTP
   * transaction.
   * 
   * @param {UrlPatternMatcher} matcher an object that contains information
   *                                    about the REST sub-route associated with
   *                                    the current HTTP transaction.
   * @param {Function} callbackHandler the reference to the <code>exit</code> 
   *                                  method associated with the current HTTP
   *                                  transaction.
   * @param {MethodDescriptor} methodDescriptor the method descriptor for the 
   *                                            current HTTP transaction.
   * @param {HttpRequest} req the request object associated with the current
   *                          HTTP transaction.
   * 
   * @return {any} an array that contains the parameter for a HTTP method call.
   */
  public buildParameters(matcher:UrlPatternMatcher, callbackHandler:Function,
                         methodDescriptor:MethodDescriptor,
                         req:HttpRequest):any[]{
    let map:Map<string, ParameterDescriptor> = methodDescriptor.parametersMap;
    let parameters:any[] = new Array<any>(map.size);
    let annotationType:AnnotationType = null;
    let index:number = -1;
    let annotationTypeString:string = null;
    let util:AnnotationTypeUtil = null;
    map.forEach((value:ParameterDescriptor, key:string,
                                        map:Map<string, ParameterDescriptor>)=>{
      annotationType = value.annotationType;
      index = value.index;
      if(annotationType === AnnotationType.EXIT) {
        parameters[index] = callbackHandler;
      } else if(annotationType === AnnotationType.PATH_PARAM) {
        parameters[index] = matcher.properties[value.key];
      } else if(annotationType === AnnotationType.HTTP_REQUEST) {
        parameters[index] = req;
      } else if(annotationType === AnnotationType.QUERY_PARAM) {
        parameters[index] = matcher.queryParams[value.key];
      } else if(annotationType === AnnotationType.REQUEST_BODY) {
        parameters[index] = req.getBody();
      } else if(annotationType === AnnotationType.COOKIE_PARAM) {
        parameters[index] = req.getCookies()[value.key];
      } else {
        util = new AnnotationTypeUtil();
        annotationTypeString = util.getParamStringRef(annotationType);
        throw new SandcatError(
          SandcatLocaleManager.getInstance()
                              .get("errors.paramInjector", annotationTypeString)
        )
      }
    });
    return parameters;
  }
}