//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {Sandcat} from "../Sandcat";
import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";
import {DomainContainer} from "jec-glasscat-core";
import {LogLevel} from "jec-commons";
import {SandcatAutowireProcessor} from "./SandcatAutowireProcessor";
import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {SandcatError} from "../exceptions/SandcatError";

/**
 * The default implementation of the <code>Sandcat</code> interface.
 */
export class DefaultSandcatContainer implements Sandcat {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultSandcatContainer</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>DomainContainer</code> object associated with this Sandcat
   * container.
   */
  private _domainContainer:DomainContainer = null;

  /**
   * The list of root path objects associated with this Sandcat container.
   */
  private _rootPathList:Map<string, RootPathDescriptor> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    SandcatLoggerProxy.getInstance();
    this._rootPathList = new Map<string, RootPathDescriptor>();
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   * @param {number} logLevel the log level of the message sent to the output
   *                          stream. Valid values are the constants of the
   *                          <code>LogLevel</code> class.
   */
  private sendMessage(message:string, logLevel?:number):void {
    SandcatLoggerProxy.getInstance().log(message, logLevel);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the <code>DomainContainer</code> object associated with this
   * Sandcat container.
   * 
   * @return {DomainContainer} the <code>DomainContainer</code> object 
   *                           associated with this Sandcat container.
   */
  public getDomainContainer():DomainContainer {
    return this._domainContainer;
  }

  /**
   * @inheritDoc
   */
  public setDomainContainer(container:DomainContainer):void {
    let message:string = "domain container initialized:";
    this._domainContainer = container;
    SandcatLoggerProxy.getInstance().setLogger(container.getLogger());
    this.sendMessage(message);
  }

  /**
   * @inheritDoc
   */
  public process(callback:(err:SandcatError)=>void):void {
    let message:string = "Sandcat process start";
    let processor:SandcatAutowireProcessor = null;
    let error:SandcatError = null;
    this.sendMessage(message);
    if(this._domainContainer === null) {
      message = "Sandcat error: DomainContainer must not be null";
      this.sendMessage(message);
      error = new SandcatError(message);
    } else {
      processor = new SandcatAutowireProcessor();
      processor.setSandcatContainer(this);
      this._domainContainer.getSourceFileInspector().addProcessor(processor);
      this.sendMessage("Sandcat process complete");
    }
    callback(error);
  }

  /**
   * @inheritDoc
   */
  public addRootPath(rootPath:RootPathDescriptor):void {
    this._rootPathList.set(rootPath.ref, rootPath);
  }
  
  /**
   * @inheritDoc
   */
  public getRootPath(rootPathRef:string):RootPathDescriptor {
    let rootPath:RootPathDescriptor = this._rootPathList.get(rootPathRef);
    return rootPath;
  }
};
