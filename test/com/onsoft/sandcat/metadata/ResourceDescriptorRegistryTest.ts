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
import { ResourceDescriptorRegistry } from "../../../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { ParameterDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";

@TestSuite({
  description: "Test the ResourceDescriptorRegistry class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class ResourceDescriptorRegistryTest {
  
  public descriptor:ResourceDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new ResourceDescriptor();
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
    expect(ResourceDescriptorRegistry.getRegisteredDescriptor()).to.be.null;
  }
  
  @Test({
    description: "should return 'null'",
    order: 2
  })
  public getParametersMapDefaultTest():void {
    expect(ResourceDescriptorRegistry.getParametersMap()).to.be.null;
  }

  @Test({
    description: "should set the ResourceDescriptor instance",
    order: 3
  })
  public registerDescriptorTest():void {
    expect(
      ResourceDescriptorRegistry.registerDescriptor(this.descriptor)
    ).to.be.undefined;
  }
  
  @Test({
    description: "should return the same ResourceDescriptor instance as set with the registerDescriptor() method",
    order: 4
  })
  public getRegisteredDescriptorTest():void {
    expect(
      ResourceDescriptorRegistry.getRegisteredDescriptor()
    ).to.equal(this.descriptor);
  }
  
  @Test({
    description: "should return an empty map",
    order: 5
  })
  public getParametersMapTest():void {
    const map:Map<string, Array<ParameterDescriptor>> =
                                  ResourceDescriptorRegistry.getParametersMap();
    expect(map.size).to.equal(0);
  }

  @Test({
    description: "should set a 'null' reference instead of the ResourceDescriptor instance",
    order: 6
  })
  public resetDescriptorTest():void {
    expect(
      ResourceDescriptorRegistry.registerDescriptor(null)
    ).to.be.undefined;
  }
  
  @Test({
    description: "should return 'null'",
    order: 7
  })
  public getRegisteredDescriptorResetTest():void {
    expect(ResourceDescriptorRegistry.getRegisteredDescriptor()).to.be.null;
  }
  
  @Test({
    description: "should return 'null'",
    order: 8
  })
  public getParametersMapResetTest():void {
    expect(ResourceDescriptorRegistry.getParametersMap()).to.be.null;
  }
}