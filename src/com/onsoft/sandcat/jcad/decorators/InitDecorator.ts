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

import {Decorator} from "jec-commons";
import {ResourceDescriptorRegistry} from "../../metadata/ResourceDescriptorRegistry";
import {JsletMethodDescriptorBuilder} from "../../builders/JsletMethodDescriptorBuilder";
import {ResourceDescriptor} from "../../reflect/ResourceDescriptor";
import {JsletMethodDescriptor} from "../../reflect/JsletMethodDescriptor";
import {JsletMethod} from "../../reflect/JsletMethod"

/**
 * The <code>InitDecorator</code> class defines the <code>Decorator</code>  
 * implementation for the JARS <code>@Init</code> decorator.
 */
export class InitDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InitDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, descriptor:PropertyDescriptor):any {
    let resourceDesc:ResourceDescriptor =
                           ResourceDescriptorRegistry.getRegisteredDescriptor();
    let builder:JsletMethodDescriptorBuilder =
                                             new JsletMethodDescriptorBuilder();
    let methodDescriptor:JsletMethodDescriptor = builder.build(
      JsletMethod.INIT, key, descriptor
    );
    resourceDesc.addJsletMethod(methodDescriptor);
    return target;
  }
}
