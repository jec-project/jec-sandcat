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
import {ResourceDescriptorRegistry} from "../metadata/ResourceDescriptorRegistry";

/**
 * A helper class that provides static methods for working with parameters maps
 * defined by the <code>ResourceDescriptor</code> class.
 */
export class ParametersMapUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the collection of <code>ParameterDescriptor</code> objects 
   * associated with the specified method name.
   * 
   * @param {string} methodName the name of the method for which to return the
   *                            parameters descriptors.
   * @returns {Array<ParameterDescriptor>} the collection of
   *                                       <code>ParameterDescriptor</code>
   *                                       objects associated with the
   *                                       specified method name.
   */
  public static getParameterCollection(methodName:string):
                                                    Array<ParameterDescriptor> {
    const map:Map<string, Array<ParameterDescriptor>> =
                                  ResourceDescriptorRegistry.getParametersMap();
    let result:Array<ParameterDescriptor> = null;
    if(map.has(methodName)) {
      result = map.get(methodName);
    } else {
      result = new Array<ParameterDescriptor>();
      map.set(methodName, result);
    }
    return result;
  }
};
