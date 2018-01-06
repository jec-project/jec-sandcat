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

import {Sandcat} from "../Sandcat";
import {DefaultSandcatContainer} from "../core/DefaultSandcatContainer";
import {DelegatedContainerBuilder, DelegatedContainer} from "jec-commons";
import {DomainContainer} from "jec-glasscat-core";

/**
 * A helper class that creates new <code>Sandcat</code> instances.
 */
export class SandcatBuilder implements DelegatedContainerBuilder {

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
   * @inheritDoc
   */
  public build(container:DomainContainer):DelegatedContainer {
    let sandcat:Sandcat = new DefaultSandcatContainer();
    sandcat.setDomainContainer(container);
    return sandcat;
  }
};
