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

import { TestSuite, Test, BeforeAll, AfterAll, Before, After, TestSorters } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { ResourceDescriptorUtil } from "../../../../../src/com/onsoft/sandcat/utils/ResourceDescriptorUtil";
import { DefaultSandcatContainer } from "../../../../../src/com/onsoft/sandcat/core/DefaultSandcatContainer";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { MethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import { Sandcat } from "../../../../../src/com/onsoft/sandcat/Sandcat";
import {ParametersMapUtil} from "../../../../../src/com/onsoft/sandcat//utils/ParametersMapUtil";
import { HttpMethod } from "jec-commons";
import { ResourceDescriptorRegistry } from "../../../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the ResourceDescriptorUtil class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class ResourceDescriptorUtilTest {

  public descriptorUtil:ResourceDescriptorUtil = null;
  public descriptor:ResourceDescriptor = null;
  public methodDescriptor:MethodDescriptor = null;
  public sandcatContainer:Sandcat = null;
  public resource:any = null;

  @BeforeAll()
  public initTest():void {
    this.sandcatContainer = new DefaultSandcatContainer();
    this.descriptor = new ResourceDescriptor();
    this.descriptor.contextRoot = "foo";
    this.descriptor.resourcePath = "/resourcePath";
    ResourceDescriptorRegistry.registerDescriptor(this.descriptor);
    this.methodDescriptor = new MethodDescriptor();
    this.methodDescriptor.name = "methodDescriptorName";
    this.methodDescriptor.httpMethod = HttpMethod.GET;
    this.methodDescriptor.route = "/bar";
  }

  @Before()
  public initResourceTest():void {
    this.resource = {};
  }

  @AfterAll()
  public resetTest():void {
    ResourceDescriptorRegistry.registerDescriptor(null);
    this.sandcatContainer = null;
    this.descriptor = null;
  }

  @After()
  public resetResource():void {
    this.resource = null;
  }

  @Test({
    description: "should create a protected '__sandcatResourceDescriptor' property",
    order: 0
  })
  public decoratePropertyTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    expect(this.resource).to.have.property("__sandcatResourceDescriptor");
  }

  @Test({
    description: "should create an immutable property",
    order: 1
  })
  public decorateImmutablePropertyTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    let doOverride:Function = function():void {
      this.resource.__sandcatResourceDescriptor = {};
    };
    expect(doOverride.bind(this)).to.throw(TypeError);
  }

  @Test({
    description: "should create a protected 'getResourceDescriptor' method",
    order: 2
  })
  public decorateMethodTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    expect(this.resource.getResourceDescriptor).to.not.be.undefined;
  }
  
  @Test({
    description: "should create an immutable method",
    order: 3
  })
  public decorateImmutableMethodTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    let doOverride:Function = function():void {
      this.resource.getResourceDescriptor = function():void {};
    };
    expect(doOverride.bind(this)).to.throw(TypeError);
  }

  @Test({
    description: "should do nothing when no methods are registered in the ResourceDescriptor instance",
    order: 4
  })
  public fixCompositeValuesTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    expect(this.descriptorUtil.fixCompositeValues()).to.be.OK;
  }
  
  @Test({
    description: "should invoke the getParameterCollection() method of the ParametersMapUtil class",
    order: 5
  })
  public parametersMapUtilTest():void {
    let spy:any = chai.spy.on(ParametersMapUtil, "getParameterCollection");
    this.descriptor.addMethod(this.methodDescriptor);
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.fixCompositeValues();
    expect(spy).to.have.been.called.with(this.methodDescriptor.name);
    
  }
  
  @Test({
    description: "should update the urlPatterns property of the specified method descriptor with the correct values",
    order: 6
  })
  public setMethodUrlPatternsTest():void {
    let pattern:string = this.methodDescriptor.urlPatterns[0];
    expect(pattern).to.include(this.descriptor.contextRoot);
    expect(pattern).to.include(this.descriptor.resourcePath);
    this.descriptor.methodsMap.clear();
  }
}