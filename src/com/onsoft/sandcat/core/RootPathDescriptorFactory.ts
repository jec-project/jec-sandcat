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

import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";
import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {RootPathDescriptorRegistry} from "../metadata/RootPathDescriptorRegistry";
import {JecStringsEnum, UrlStringsEnum, ClassLoader, FileProperties} from "jec-commons";
import {RootPathDescriptorUtil} from "../utils/RootPathDescriptorUtil";

/**
 * The factory class which is used by Sandcat to create new
 * <code>RootPathDescriptor</code> instances.
 */
export class RootPathDescriptorFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RootPathDescriptorFactory</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    SandcatLoggerProxy.getInstance();
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
   * Creates and returns a new <code>RootPathDescriptor</code> instance.
   * 
   * @param {FileProperties} file the <code>FileProperties</code> that contains
   *                              information about the resource class
   *                              associated with the new 
   *                              <code>RootPathDescriptor</code> instance.
   * @return {RootPathDescriptor} a new <code>RootPathDescriptor</code>
   *                              instance.
   */
  public create(file:FileProperties):RootPathDescriptor {
    let pathDesc:RootPathDescriptor = new RootPathDescriptor();
    RootPathDescriptorRegistry.registerDescriptor(pathDesc);
    let loader:ClassLoader = new ClassLoader();
    let filePath:string = 
       file.path + file.name + UrlStringsEnum.DOT + JecStringsEnum.JS_EXTENSION;
    let ConstObj:any = loader.loadClass(filePath);
    let rootPathObj:any = new ConstObj();
    let descriptorUtil:RootPathDescriptorUtil =
                              new RootPathDescriptorUtil(rootPathObj, pathDesc);
    descriptorUtil.decorate();
    RootPathDescriptorRegistry.registerDescriptor(null);
    return pathDesc;
  }
};
