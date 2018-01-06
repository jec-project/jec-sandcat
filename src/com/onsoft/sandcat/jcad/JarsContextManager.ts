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

import {JcadContext, Decorator, DecoratorConnector, JcadContextManager,
        JcadContextFactory, DecoratorConnectorManager} from "jec-commons";
import {JarsConnectorRefs} from "jec-jars";
import {SandcatConnector} from "./connectors/SandcatConnector";
import {CookieParamDecorator} from "./decorators/CookieParamDecorator";
import {CONNECTDecorator} from "./decorators/CONNECTDecorator";
import {DELETEDecorator} from "./decorators/DELETEDecorator";
import {DestroyDecorator} from "./decorators/DestroyDecorator";
import {ExitDecorator} from "./decorators/ExitDecorator";
import {GETDecorator} from "./decorators/GETDecorator";
import {HEADDecorator} from "./decorators/HEADDecorator";
import {InitDecorator} from "./decorators/InitDecorator";
import {OPTIONSDecorator} from "./decorators/OPTIONSDecorator";
import {PathParamDecorator} from "./decorators/PathParamDecorator";
import {POSTDecorator} from "./decorators/POSTDecorator";
import {PUTDecorator} from "./decorators/PUTDecorator";
import {QueryParamDecorator} from "./decorators/QueryParamDecorator";
import {RequestBodyDecorator} from "./decorators/RequestBodyDecorator";
import {RequestParamDecorator} from "./decorators/RequestParamDecorator";
import {ResourcePathDecorator} from "./decorators/ResourcePathDecorator";
import {RootPathDecorator} from "./decorators/RootPathDecorator";
import {RootPathRefsDecorator} from "./decorators/RootPathRefsDecorator";
import {TRACEDecorator} from "./decorators/TRACEDecorator";

/**
 * A helper class that is used to manage desciptor contexts for the JARS
 * specification.
 */
export class JarsContextManager {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JarsContextManager</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>JcadContext</code> associated with this
   * manager.
   */
  private _jcadContext:JcadContext = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the context for the specified reference.
   * 
   * @param {string} jcadReference the reference to the context to initialize.
   * @param {Class} decoratorClass the reference to the decorator class
   *                               associated whith the context to initialize.
   */
  private initContext(jcadReference:string, decoratorClass:any):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    let decorator:Decorator = new decoratorClass();
    let connector:DecoratorConnector =
                                 new SandcatConnector(jcadReference, decorator);
    ctxManager.addContext(jcadReference, this._jcadContext);
    connManager.addConnector(connector, this._jcadContext);
  }

  /**
   * Removes the context with the specified reference.
   * 
   * @param {string} jcadReference the reference of the context to remove.
   */
  private removeContext(jcadReference:string):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    connManager.removeConnector(jcadReference, this._jcadContext);
    ctxManager.removeContext(jcadReference);
  }

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the JCAD context associated with this object.
   */
  public createContext():void {
    let ctxFactory:JcadContextFactory = new JcadContextFactory();
    this._jcadContext = ctxFactory.create();
    this.initContext(
      JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF, CookieParamDecorator
    );
    this.initContext(
      JarsConnectorRefs.CONNECT_CONNECTOR_REF, CONNECTDecorator
    );
    this.initContext(
      JarsConnectorRefs.DELETE_CONNECTOR_REF, DELETEDecorator
    );
    this.initContext(
      JarsConnectorRefs.DESTROY_CONNECTOR_REF, DestroyDecorator
    );
    this.initContext(
      JarsConnectorRefs.EXIT_CONNECTOR_REF, ExitDecorator
    );
    this.initContext(
      JarsConnectorRefs.GET_CONNECTOR_REF, GETDecorator
    );
    this.initContext(
      JarsConnectorRefs.HEAD_CONNECTOR_REF, HEADDecorator
    );
    this.initContext(
      JarsConnectorRefs.INIT_CONNECTOR_REF, InitDecorator
    );
    this.initContext(
      JarsConnectorRefs.OPTIONS_CONNECTOR_REF, OPTIONSDecorator
    );
    this.initContext(
      JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF, PathParamDecorator
    );
    this.initContext(
      JarsConnectorRefs.POST_CONNECTOR_REF, POSTDecorator
    );
    this.initContext(
      JarsConnectorRefs.PUT_CONNECTOR_REF, PUTDecorator
    );
    this.initContext(
      JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF, QueryParamDecorator
    );
    this.initContext(
      JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF, RequestBodyDecorator
    );
    this.initContext(
      JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF, RequestParamDecorator
    );
    this.initContext(
      JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF, ResourcePathDecorator
    );
    this.initContext(
      JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF, RootPathDecorator
    );
    this.initContext(
      JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF, RootPathRefsDecorator
    );
    this.initContext(
      JarsConnectorRefs.TRACE_CONNECTOR_REF, TRACEDecorator
    );
  }

  /**
   * Finalizes the JCAD context associated with this object.
   */
  public deleteContext():void {
    this.removeContext(JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.CONNECT_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.DELETE_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.DESTROY_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.EXIT_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.GET_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.HEAD_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.INIT_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.OPTIONS_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.POST_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.PUT_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF);
    this.removeContext(JarsConnectorRefs.TRACE_CONNECTOR_REF);
    this._jcadContext = null;
  }
}