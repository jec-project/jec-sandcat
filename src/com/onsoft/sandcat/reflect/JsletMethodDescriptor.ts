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

/**
 * The <code>JsletMethodDescriptor</code> class contains information about a  
 * function mapped to a jslet method in the Sandcat framework.
 */
export class JsletMethodDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JsletMethodDescriptor</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * The reference to the jslet method mapped whih the resource function. Valid
   * values are the constants of the <code>JsletMethod</code> class.
   */
  public jsletMethod:number = null;

  /**
   * The name of the mapped resource function.
   */
  public name:string = null;

  /**
   * The reference to the mapped resource function.
   */
  public action:Function = null;
}