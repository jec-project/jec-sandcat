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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { ResourcePathSolver } from "../../../../../src/com/onsoft/sandcat/utils/ResourcePathSolver";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { UrlStringsEnum } from "jec-commons";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/ResourcePathSolverTestUtils";

@TestSuite({
  description: "Test the ResourcePathSolver class properties"
})
export class ResourcePathSolverTest {

  public solver:ResourcePathSolver = null;

  @BeforeAll()
  public initTest():void {
    this.solver = new ResourcePathSolver();
  }

  @Test({
    description: "should set the 'resourcePath' property of the ResourceDescriptor instance with the specified path"
  })
  public resolvePathTest():void {
    let descriptor:ResourceDescriptor = new ResourceDescriptor();
    this.solver.resolvePath(utils.BASE_PATH, descriptor);
    expect(descriptor.resourcePath).to.equal(utils.BASE_PATH);
  }

  @Test({
    description: "should add a slash to the specified path"
  })
  public noSlashPathTest():void {
    let descriptor:ResourceDescriptor = new ResourceDescriptor();
    this.solver.resolvePath(utils.NO_SLASH_BASE_PATH, descriptor);
    expect(descriptor.resourcePath).to.equal(utils.BASE_PATH);
  }
}