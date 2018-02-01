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

import {JsletMethodDescriptor} from "../reflect/JsletMethodDescriptor";
import {JsletMethod} from "../reflect/JsletMethod";

/**
 * A helper class that creates new <code>JsletMethodDescriptor</code> instances.
 */
export class JsletMethodDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JsletMethodDescriptorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>JsletMethodDescriptor</code> instance.
   * 
   * @param {JsletMethod} jsletMethod the jslet method associated with the
   *                                  decorated  method.
   * @param {string} key the name of the decorated method.
   * @param {PropertyDescriptor} descriptor the property descriptor associated
   *                                        with the decorated method.
   * @return {JsletMethodDescriptor} a new <code>JsletMethodDescriptor</code>
   *                                 instance.
   */
  public build(jsletMethod:JsletMethod, key:string,
                          descriptor:PropertyDescriptor):JsletMethodDescriptor {
    let methodDesc:JsletMethodDescriptor = new JsletMethodDescriptor();
    methodDesc.jsletMethod = jsletMethod;
    methodDesc.name = key;
    methodDesc.action = descriptor.value;
    return methodDesc;
  }
};
