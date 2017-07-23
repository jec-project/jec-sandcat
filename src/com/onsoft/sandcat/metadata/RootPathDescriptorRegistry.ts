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

import {RootPathDescriptor} from "../reflect/RootPathDescriptor";

/**
 * A static helper class which is used to temporarily store
 * <code>RootPathDescriptor</code> instances during Sandcat decorators lookup
 * process.
 */
export class RootPathDescriptorRegistry {

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>RootPathDescriptor</code> instance currently 
   * registered in this <code>RootPathDescriptorRegistry</code> object.
   */
  private static _rootPathDescriptor:RootPathDescriptor = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Registers a <code>RootPathDescriptor</code> instance into this
   * <code>RootPathDescriptorRegistry</code> object.
   *
   * @param {RootPathDescriptor} rootPathDescriptor the
   *                                             <code>RootPathDescriptor</code>
   *                                                to register.
   */
  public static registerDescriptor(rootPathDescriptor:RootPathDescriptor):any {
    RootPathDescriptorRegistry._rootPathDescriptor = rootPathDescriptor;
  }

  /**
   * Returns the <code>RootPathDescriptor</code> instance registered into this
   * <code>RootPathDescriptorRegistry</code> object.
   *
   * @return {RootPathDescriptor} the <code>RootPathDescriptor</code> registered  
   *                           into this <code>RootPathDescriptorRegistry</code>
   *                              object.
   */
  public static getRegisteredDescriptor():RootPathDescriptor {
    return RootPathDescriptorRegistry._rootPathDescriptor;
  }
}
