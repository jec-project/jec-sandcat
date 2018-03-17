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

import {Sandcat} from "../Sandcat";
import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";
import {DomainContainer} from "jec-glasscat-core";
import {LocaleManager} from "jec-commons-node";
import {LogLevel} from "jec-commons";
import {SandcatAutowireProcessor} from "./SandcatAutowireProcessor";
import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {SandcatError} from "../exceptions/SandcatError";
import {SandcatLocaleManager} from "../i18n/SandcatLocaleManager";
import * as path  from "path";

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
   * @param {LogLevel} logLevel the log level of the message sent to the output
   *                          stream.
   */
  private sendMessage(message:string, logLevel?:LogLevel):void {
    SandcatLoggerProxy.getInstance().log(message, logLevel);
  }

  private initLocaleManager(container:DomainContainer):void {
    const cfg:any = { directory: "" };
    let localeString:string = null;
    let localesPath:string = null;
    if(container !== null &&
       container.getLocale !== undefined // !Determines test cases!
      ) {
      localeString = container.getLocale().toString();
      localesPath = path.join(
        process.cwd(), "node_modules/jec-sandcat/public/locales/"
      );
    } else {
      localeString = "en-US";
    }
    cfg.directory = localesPath;
    SandcatLocaleManager.getInstance().init(localeString, cfg);
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
    this.initLocaleManager(container);
    this._domainContainer = container;
    SandcatLoggerProxy.getInstance().setLogger(container.getLogger());
    this.sendMessage(
      SandcatLocaleManager.getInstance().get("process.domain"),
      LogLevel.DEBUG
    );
  }

  /**
   * @inheritDoc
   */
  public process(callback:(err:SandcatError)=>void):void {
    const i18n:LocaleManager = SandcatLocaleManager.getInstance();
    let processor:SandcatAutowireProcessor = null;
    let error:SandcatError = null;
    if(this._domainContainer === null) {
      this.initLocaleManager(null);
      error = new SandcatError(i18n.get("errors.domain"));
      callback(error);
    } else {
      this.sendMessage(i18n.get("process.start"), LogLevel.DEBUG);
      processor = new SandcatAutowireProcessor();
      processor.setSandcatContainer(this);
      this.sendMessage(i18n.get("process.init"), LogLevel.DEBUG);
      processor.processCompleteHandler = (err:any)=> {
        callback(err);
        this.sendMessage(i18n.get("process.complete"), LogLevel.DEBUG);
        processor.processCompleteHandler = null;
      };
      this._domainContainer.getSourceFileInspector().addProcessor(processor);
    }
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
    const rootPath:RootPathDescriptor = this._rootPathList.get(rootPathRef);
    return rootPath;
  }
};
