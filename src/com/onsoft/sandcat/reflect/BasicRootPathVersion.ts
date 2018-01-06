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

import {RootPathVersion} from "jec-jars";

/**
 * The <code>BasicRootPathVersion</code> class represents the default  
 * implementation for the <code>RootPathVersion</code> interface in the Sandcat
 * framework.
 */
export class BasicRootPathVersion implements RootPathVersion {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicRootPathVersion</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The major number version of a REST API.
   */
  public major:number = null;

  /**
   * The minor number version of a REST API.
   */
  public minor:number = null;

  /**
   * The version prefix of a REST API.
   */
  public prefix:string = null;
}