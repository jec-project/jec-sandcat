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

import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {ParameterDescriptor} from "../reflect/ParameterDescriptor";

/**
 * A static helper class which is used to temporarily store
 * <code>ResourceDescriptor</code> instances during Sandcat decorators lookup
 * process.
 */
export class ResourceDescriptorRegistry {

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>ResourceDescriptor</code> instance currently 
   * registered in this <code>ResourceDescriptorRegistry</code> object.
   */
  private static _resourceDescriptor:ResourceDescriptor = null;

  /**
   * The map which is used to store the parameter descriptors for the HTTP
   * methods exposed by the associated resource.
   */
  private static _parametersMap:Map<string, Array<ParameterDescriptor>> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Registers a <code>ResourceDescriptor</code> instance into this
   * <code>ResourceDescriptorRegistry</code> object.
   *
   * @param {ResourceDescriptor} resourceDescriptor the 
   *                                             <code>ResourceDescriptor</code>
   *                                                to register.
   */
  public static registerDescriptor(resourceDescriptor:ResourceDescriptor):any {
    ResourceDescriptorRegistry._resourceDescriptor = resourceDescriptor;
    if(resourceDescriptor) {
      ResourceDescriptorRegistry._parametersMap =
                                  new Map<string, Array<ParameterDescriptor>>();
    } else ResourceDescriptorRegistry._parametersMap = null;
  }

  /**
   * Returns the <code>ResourceDescriptor<code> instance registered into this
   * <code>ResourceDescriptorRegistry</code> object.
   *
   * @return {ResourceDescriptor} the <code>ResourceDescriptor</code> registered  
   *                              into this
   *                              <code>ResourceDescriptorRegistry</code>
   *                              object.
   */
  public static getRegisteredDescriptor():ResourceDescriptor {
    return ResourceDescriptorRegistry._resourceDescriptor;
  }
  
  /**
   * Returns the map which is used to store the parameter descriptors for the 
   * HTTP methods exposed by the associated resource.
   *
   * @return {Map<string, Array<ParameterDescriptor>>} the map of
   *                                            <code>ParameterDescriptor</code>
   *                                                   objects.
   */
  public static getParametersMap():Map<string, Array<ParameterDescriptor>> {
    return ResourceDescriptorRegistry._parametersMap;
  }
}
