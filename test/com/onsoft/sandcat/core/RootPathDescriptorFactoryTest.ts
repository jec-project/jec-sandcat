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

import { TestSuite, Test, AfterAll, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { RootPathDescriptorFactory } from "../../../../../src/com/onsoft/sandcat/core/RootPathDescriptorFactory";
import { RootPathDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";
import { JarsContextManager } from "../../../../../src/com/onsoft/sandcat/jcad/JarsContextManager";
import { RootPathVersion } from "jec-jars";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/RootPathDescriptorFactoryTestUtils";

@TestSuite({
  description: "Test the RootPathDescriptorFactory class properties",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class RootPathDescriptorFactoryTest {

  public factory:RootPathDescriptorFactory = null;
  public contextManager:JarsContextManager = null;
  public descriptor:RootPathDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.contextManager = new JarsContextManager();
    this.contextManager.createContext();
    this.factory = new RootPathDescriptorFactory();
  }

  @AfterAll()
  public resetTest():void {
    this.factory = null;
    this.contextManager.deleteContext();
    this.contextManager = null;
  }

  @Test({
    description: "should return a new instance of the 'RootPathDescriptor' class",
    order: 0
  })
  public createTest():void {
    this.descriptor = this.factory.create(utils.FILE);
    expect(this.descriptor).to.be.an.instanceOf(RootPathDescriptor);
  }
  
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct 'path' property",
    order: 1
  })
  public pathTest():void {
    expect(this.descriptor.path).to.equal(utils.PATH);
  }
    
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct 'fullPath' property",
    order: 2
  })
  public fullPathTest():void {
    expect(this.descriptor.fullPath).to.equal(utils.FULLPATH);
  }
    
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct 'ref' property",
    order: 3
  })
  public refTest():void {
    expect(this.descriptor).to.have.a.property("ref", utils.REF);
  }
  
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct version 'prefix' value",
    order: 4
  })
  public versionPrefixTest():void {
    const version:RootPathVersion = this.descriptor.version;
    expect(version).to.have.a.property("prefix", utils.VERSION.prefix);
  }
  
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct version 'major' value",
    order: 5
  })
  public versionMajorTest():void {
    const version:RootPathVersion = this.descriptor.version;
    expect(version).to.have.a.property("major", utils.VERSION.major);
  }
  
  @Test({
    description: "should return a new 'RootPathDescriptor' instance with the correct version 'minor' value",
    order: 6
  })
  public versionMinorTest():void {
    const version:RootPathVersion = this.descriptor.version;
    expect(version).to.have.a.property("minor", utils.VERSION.minor);
  }
}