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

import { TestSuite, Test, TestSorters, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { RootPathDescriptorRegistry } from "../../../../../src/com/onsoft/sandcat/metadata/RootPathDescriptorRegistry";
import { RootPathDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";

@TestSuite({
  description: "Test the RootPathDescriptorRegistry class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class RootPathDescriptorRegistryTest {
  
  public descriptor:RootPathDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new RootPathDescriptor();
  }

  @AfterAll()
  public resetTest():void {
    this.descriptor = null;
  }

  @Test({
    description: "should return 'null'",
    order: 1
  })
  public getRegisteredDescriptorDefaultTest():void {
    expect(RootPathDescriptorRegistry.getRegisteredDescriptor()).to.be.null;
  }
  
  @Test({
    description: "should set the RootPathDescriptor instance",
    order: 2
  })
  public registerDescriptorTest():void {
    expect(
      RootPathDescriptorRegistry.registerDescriptor(this.descriptor)
    ).to.be.undefined;
  }
  
  @Test({
    description: "should return the same RootPathDescriptor instance as set with the registerDescriptor() method",
    order: 3
  })
  public getRegisteredDescriptorTest():void {
    expect(
      RootPathDescriptorRegistry.getRegisteredDescriptor()
    ).to.equal(this.descriptor);
  }
  
  @Test({
    description: "should set a 'null' reference instead of the RootPathDescriptor instance",
    order: 4
  })
  public resetDescriptorTest():void {
    expect(
      RootPathDescriptorRegistry.registerDescriptor(null)
    ).to.be.undefined;
  }
  
  @Test({
    description: "should return 'null'",
    order: 5
  })
  public getRegisteredDescriptorResetTest():void {
    expect(RootPathDescriptorRegistry.getRegisteredDescriptor()).to.be.null;
  }
}