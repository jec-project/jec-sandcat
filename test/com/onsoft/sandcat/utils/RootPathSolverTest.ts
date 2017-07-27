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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { RootPathSolver } from "../../../../../src/com/onsoft/sandcat/utils/RootPathSolver";
import { RootPathDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";
import { UrlStringsEnum } from "jec-commons";
import { RoutePathParams } from "jec-jars";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/RootPathSolverTestUtils";

@TestSuite({
  description: "Test the RootPathSolver class properties",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class RootPathSolverTest {

  public solver:RootPathSolver = null;

  @BeforeAll()
  public initTest():void {
    this.solver = new RootPathSolver();
  }

  @Test({
    description: "should add a slash character at the end of the 'fullPath' property of the RootPathDescriptor instance",
    order: 1
  })
  public addSlashTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {};
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(fullPath.lastIndexOf(utils.SLASH)).to.equal(fullPath.length - 1);
  }

  @Test({
    description: "should set the 'fullPath' property of the RootPathDescriptor instance with the specified path",
    order: 2
  })
  public resolvePathTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {};
    this.solver.resolvePath(params, descriptor);
    expect(descriptor.fullPath).to.equal(utils.BASE_PATH + utils.SLASH);
  }

  @Test({
    description: "should add a slash character at the begining of the specified path",
    order: 3
  })
  public noSlashPathAddSlashTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.NO_SLASH_BASE_PATH;
    let params:RoutePathParams = {};
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(fullPath.lastIndexOf(utils.SLASH)).to.equal(fullPath.length - 1);
  }

  @Test({
    description: "should add a slash character at the end of the 'fullPath' property of the RootPathDescriptor instance",
    order: 4
  })
  public noSlashPathTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.NO_SLASH_BASE_PATH;
    let params:RoutePathParams = {};
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(descriptor.fullPath).to.equal(utils.BASE_PATH + utils.SLASH);
  }
  
  @Test({
    description: "should add the API minor version to the 'fullPath' property of the RootPathDescriptor instance",
    order: 5
  })
  public minorVersionTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {
      version: utils.VERSION
    };
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(descriptor.fullPath).to.include(utils.VERSION.minor);
  }
  
  @Test({
    description: "should add the API major version to the 'fullPath' property of the RootPathDescriptor instance",
    order: 6
  })
  public majorVersionTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {
      version: utils.VERSION
    };
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(descriptor.fullPath).to.include(utils.VERSION.major);
  }
  
  @Test({
    description: "should add the API version prefix to the 'fullPath' property of the RootPathDescriptor instance",
    order: 7
  })
  public versionPrefixTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {
      version: utils.VERSION
    };
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(descriptor.fullPath).to.include(utils.VERSION.prefix);
  }
  
  @Test({
    description: "should add the API version string to the 'fullPath' property of the RootPathDescriptor instance",
    order: 7
  })
  public versionTest():void {
    let descriptor:RootPathDescriptor = new RootPathDescriptor();
    descriptor.path = utils.BASE_PATH;
    let params:RoutePathParams = {
      version: utils.VERSION
    };
    this.solver.resolvePath(params, descriptor);
    let fullPath:string = descriptor.fullPath;
    expect(descriptor.fullPath).to.include(utils.VERSION_STRING);
  }
}