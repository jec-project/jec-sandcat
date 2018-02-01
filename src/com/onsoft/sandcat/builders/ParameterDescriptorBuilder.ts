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

import {ParameterDescriptor} from "../reflect/ParameterDescriptor";
import {AnnotationType} from "../reflect/AnnotationType";

/**
 * A helper class that creates <code>ParameterDescriptor</code> instances.
 */
export class ParameterDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ParameterDescriptorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>ParameterDescriptor</code> instance.
   * 
   * @param {string} methodName the name of the method for which to create this
   *                            parameter descriptor.
   * @param {AnnotationType} annotationType the decoration type of method.
   * @param {number} parameterIndex the index of the parameter in the method
   *                                signature.
   * @return {ParameterDescriptor} a new <code>ParameterDescriptor</code>
   *                               instance.
   */
  public build(methodName:string, annotationType:number, 
                            parameterIndex:AnnotationType):ParameterDescriptor {
    let paramDesc:ParameterDescriptor = new ParameterDescriptor();
    paramDesc.annotationType = annotationType;
    paramDesc.index = parameterIndex;
    paramDesc.methodName = methodName;
    return paramDesc;
  }
};
