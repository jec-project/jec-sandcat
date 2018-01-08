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

import {Decorator} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import {JarsError} from "jec-jars";
import {ResourceDescriptorRegistry} from "../../metadata/ResourceDescriptorRegistry";
import {ResourceDescriptor} from "../../reflect/ResourceDescriptor";
import {ResourcePathSolver} from "../../utils/ResourcePathSolver";
import {SandcatLocaleManager} from "../../i18n/SandcatLocaleManager";

const STRING_TYPE:string = "string";

/**
 * The <code>ResourcePathDecorator</code> class defines the 
 * <code>Decorator</code> implementation for the JARS <code>@ResourcePath</code>
 * decorator.
 */
export class ResourcePathDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ResourcePathDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, params:any):any {
    let descriptor:ResourceDescriptor =
                           ResourceDescriptorRegistry.getRegisteredDescriptor();
    let solver:ResourcePathSolver = new ResourcePathSolver();
    let path:string = null;
    let i18n:LocaleManager = SandcatLocaleManager.getInstance();
    // Validation process:
    if(!params) {
      throw new JarsError(i18n.get("errors.path", target));
    } else {
      if(typeof params === STRING_TYPE) path = String(params);
      else {
        if(!params.path) {
          throw new JarsError(i18n.get("errors.path", target));
        } else {
          path = params.path;
          descriptor.produces = params.produces || null;
          descriptor.consumes = params.consumes || null;
          descriptor.crossDomainPolicy = params.crossDomainPolicy || null;
        }
      }
    }
    solver.resolvePath(path, descriptor);
    return target;
  }
}
