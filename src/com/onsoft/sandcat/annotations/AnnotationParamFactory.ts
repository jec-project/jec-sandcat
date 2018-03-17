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
import {ParametersMapUtil} from "../utils/ParametersMapUtil";
import {ParameterDescriptorBuilder} from "../builders/ParameterDescriptorBuilder";
import {AnnotationType} from "../reflect/AnnotationType";

/**
 * A utility class for registering Sandcat parameters.
 */
export class AnnotationParamFactory {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotationParamFactory</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Registers the specified parameter into the parameter collection available
   * from the <code>ParametersMapUtil</code> registery.
   * 
   * @param {string|symbol} propertyKey the name of the property parameter.
   * @param {number} parameterIndex the index of the property parameter.
   * @param {AnnotationType} annotationType the type of annotation for the
   *                                        property parameter.
   */
  public registerParam(propertyKey:string|symbol, parameterIndex:number,
                       annotationType:AnnotationType):void {
    const methodName:string = propertyKey.toString();
    const paramDesc:ParameterDescriptor = 
      ParameterDescriptorBuilder.getInstance().build(
        methodName, annotationType, parameterIndex
      );
    ParametersMapUtil.getParameterCollection(methodName).push(paramDesc);
  }
}