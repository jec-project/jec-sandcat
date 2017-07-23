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

/**
 * Contains the values that indicate the jslet method associated with a
 * <code>JsletMethodDescriptor</code> instance.
 */
export enum JsletMethod {

  /**
   * The enum value used to specify a <code>init()</code> method.
   */
  INIT = 0,

  /**
   * The enum value used to specify a <code>destroy()</code> method.
   */
  DESTROY = 1,

  /**
   * The enum value used to specify a <code>before</code> method.
   */
  BEFORE = 2,

  /**
   * The enum value used to specify a <code>after</code> method.
   */
  AFTER = 3
}