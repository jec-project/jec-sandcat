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

import {DomainConnector} from "jec-glasscat-core";
import {JsletContext} from "jec-exchange";
import {ResourceProxyJsletFactory} from "./ResourceProxyJsletFactory";
import {RootPathDescriptorFactory} from "./RootPathDescriptorFactory";
import {ResourceJsletProxy} from "../jslet/ResourceJsletProxy";
import {Sandcat} from "../Sandcat";
import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";
import {LoggerProxy, FilePreProcessor, FileProperties, DecoratorProperties} from "jec-commons";
import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {JarsContextManager} from "../jcad/JarsContextManager";
import {SandcatError} from "../exceptions/SandCatError";

/**
 * The <code>SandcatAutowireProcessor</code> class allows to find all Sandcat  
 * resources of an <code>EjpContainer</code> instance.
 */
export class SandcatAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SandcatAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>jec-jars</code> imports in a file.
   */
  private static readonly JARS_MASK:string = "jec-jars";

  /**
   * The mask used to detect the <code>@ResourcePath</code> decorator in a file.
   * 
   */
  private static readonly RESOURCE_MASK:string = "ResourcePath";

  /**
   * The mask used to detect the <code>@RootPath</code> decorator in a file.
   */
  private static readonly API_MASK:string = "RootPath";

  /**
   * The collection of <code>FileProperties</code> instances that represent a
   * resource.
   */
  private _resourceFiles:FileProperties[] = null;

  /**
   * The collection of <code>FileProperties</code> instances that represent a
   * root path.
   */
  private _rootPathFiles:FileProperties[] = null;
  
  /**
   * The reference to the Sandcat container that runs this processor.
   */
  private _sandcatContainer:Sandcat = null;

  /**
   * The reference to the <code>JutaContextManager</code> that is used to manage 
   * JCAD context objects for this processor.
   */
  private _contextManager:JarsContextManager = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._resourceFiles = new Array<FileProperties>();
    this._rootPathFiles = new Array<FileProperties>();
    this._contextManager = new JarsContextManager();
    this._contextManager.createContext();
  }

  /**
   * Apply file pre-processing transformations to the <code>@Resource</code> 
   * annotated files.
   * 
   * @param {DomainConnector} connector the domain connector for which file
   *                                    pre-processing is performed.
   */
  private transformResourceFiles(connector:DomainConnector):void {
    let context:JsletContext = connector.getContainer().getJsletContext();
    let len:number = this._resourceFiles.length;
    let resources:string[] = new Array<string>();
    let factory:ResourceProxyJsletFactory = new ResourceProxyJsletFactory();
    let jslet:ResourceJsletProxy = null;
    let contextRoot:string = connector.getContextRoot();
    while(len--) {
      jslet = factory.create(
        this._resourceFiles[len], contextRoot, this._sandcatContainer
      );
      context.addJslet(jslet);
    }
    this._resourceFiles.splice(0);
  }

  /**
   * Apply file pre-processing transformations to the <code>@RootPath</code> 
   * annotated files.
   */
  private transformRootPathFiles():void {
    let len:number = this._rootPathFiles.length;
    let rootPaths:string[] = new Array<string>();
    let factory:RootPathDescriptorFactory = new RootPathDescriptorFactory();
    let rootPath:RootPathDescriptor = null;
    while(len--) {
      rootPath = factory.create(this._rootPathFiles[len]);
      this._sandcatContainer.addRootPath(rootPath);
    }
    this._rootPathFiles.splice(0);
  }

  /**
   * Throws a <code>SandcatError</code> exception whether the
   * <code>processCompleteHandler</code> property is <code>null</code>.
   */
  private validateCallbackHandler():void {
    if(!this.processCompleteHandler) {
      throw new SandcatError(
        "SandcatAutowireProcessor: 'processCompleteHandler' property must not be null."
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * A callback method called when the <code>processComplete()</code> method is
   * invoked. This property must not be <code>null</code> when the
   * <code>processStart()</code> and <code>processComplete()</code> method are
   * invoked.
   */
  public processCompleteHandler:Function = null;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the Sandcat container reference for this processor.
   * 
   * @param {Sandcat} container the reference to the Sandcat container for this
   *                            processor.
   */
  public setSandcatContainer(container:Sandcat):void {
    this._sandcatContainer = container;
  }

  /**
   * Sets the Sandcat container reference for this processor.
   * 
   * @return {Sandcat} the reference to the Sandcat container for this
   *                   processor.
   */
  public getSandcatContainer():Sandcat {
    return this._sandcatContainer;
  }

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void {
    this.validateCallbackHandler();
  }

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, connector:DomainConnector):void {
    let decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    let classPath:string = null;
    let decoratorName:string = null;
    let logger:LoggerProxy = SandcatLoggerProxy.getInstance();
    let fileName:string = file.name;
    while(len--) {
      decorator = decorators[len];
      classPath = decorator.classPath;
      decoratorName = decorator.name;
      if(classPath === SandcatAutowireProcessor.JARS_MASK) {
        if(decoratorName === SandcatAutowireProcessor.RESOURCE_MASK) {
          this._resourceFiles.push(file);
          logger.log(
            "autowired resource detected: source file='" + fileName + "'"
          );
        } else if(decoratorName === SandcatAutowireProcessor.API_MASK) {
          this._rootPathFiles.push(file);
          logger.log(
            "autowired REST API detected: source file='" + fileName + "'"
          );
        }
      }
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(connector:DomainConnector, sourcePath:string) {
    this.validateCallbackHandler();
    this.transformRootPathFiles();
    this.transformResourceFiles(connector);
    this._contextManager.deleteContext();
    this.processCompleteHandler();
  }
}