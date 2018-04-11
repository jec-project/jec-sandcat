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
import {DomainContainer} from "jec-glasscat-core";
import {SandcatAutowireProcessor} from "./SandcatAutowireProcessor";
import {ResourceJsletProxy} from "../jslet/ResourceJsletProxy";
import {SandcatResourceJsletProxy} from "../jslet/SandcatResourceJsletProxy";
import {GlobalClassLoader, FileProperties, PathUtils} from "jec-commons";
import {ResourceDescriptorRegistry} from "../metadata/ResourceDescriptorRegistry";
import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {ResourceDescriptorUtil} from "../utils/ResourceDescriptorUtil";
import {SokokeInjector} from "jec-sokoke";

/**
 * The factory class which is used by Sandcat to create
 * <code>ResourceJsletProxy</code> instances.
 */
export class ResourceProxyJsletFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ResourceProxyJsletFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>ResourceJsletProxy</code> object.
   * 
   * @param {FileProperties} file the <code>FileProperties</code> that contains
   *                              information about the resource class
   *                              associated with the new
   *                              <code>ResourceJsletProxy</code> object.
   * @param {string} contextRoot the context root of the resource class
   *                             associated with the new
   *                             <code>ResourceJsletProxy</code> object.
   * @param {Sandcat} sandcatContainer the reference to the sandcat container
   *                                   associated with the new
   *                                   <code>ResourceJsletProxy</code> object.
   * @return {ResourceJsletProxy} a new <code>SandcatResourceJsletProxy</code>
   *                              instance.
   */
  public create(file:FileProperties, contextRoot:string,
                                  sandcatContainer:Sandcat):ResourceJsletProxy {
    const descriptor:ResourceDescriptor = new ResourceDescriptor();
    ResourceDescriptorRegistry.registerDescriptor(descriptor);
    descriptor.contextRoot = contextRoot;
    const jslet:ResourceJsletProxy = new SandcatResourceJsletProxy();
    const filePath:string = 
                    PathUtils.getInstance().buildFilePath(file.path, file.name);
    const ConstObj:any = GlobalClassLoader.getInstance().loadClass(filePath);
    const resourceObj:any = new ConstObj();
    const descriptorUtil:ResourceDescriptorUtil =
          new ResourceDescriptorUtil(resourceObj, descriptor, sandcatContainer);
    descriptorUtil.decorate();
    descriptorUtil.fixCompositeValues();
    jslet.setResource(resourceObj);
    SokokeInjector.getInstance()
                    .inject(resourceObj, SokokeInjector.DEFAULT_SCOPE_TYPES);
    ResourceDescriptorRegistry.registerDescriptor(null);
    return jslet;
  }
};
