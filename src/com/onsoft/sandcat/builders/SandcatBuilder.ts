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

import {Sandcat} from "../Sandcat";
import {DefaultSandcatContainer} from "../core/DefaultSandcatContainer";
import {DomainContainer} from "jec-glasscat-core";

/**
 * A helper class that creates new <code>Sandcat</code> instances.
 */
export class SandcatBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SandcatBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>Sandcat</code> instance.
   * 
   * @param {DomainContainer} container the domain associated with the new
   *                                    <code>Sandcat</code> instance.
   * @return {Sandcat} a new <code>Sandcat</code> instance.
   */
  public build(container:DomainContainer):Sandcat {
    let sandcat:Sandcat = new DefaultSandcatContainer();
    sandcat.setDomainContainer(container);
    return sandcat;
  }
};
