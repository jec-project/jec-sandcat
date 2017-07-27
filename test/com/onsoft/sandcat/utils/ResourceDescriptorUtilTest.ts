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

import { TestSuite, Test, BeforeAll, AfterAll, Before, After } from "jec-juta";
import { expect } from "chai";
import { ResourceDescriptorUtil } from "../../../../../src/com/onsoft/sandcat/utils/ResourceDescriptorUtil";
import { DefaultSandcatContainer } from "../../../../../src/com/onsoft/sandcat/core/DefaultSandcatContainer";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { Sandcat } from "../../../../../src/com/onsoft/sandcat/Sandcat";


@TestSuite({
  description: "Test the ResourceDescriptorUtil class properties"
})
export class ResourceDescriptorUtilTest {

  public descriptorUtil:ResourceDescriptorUtil = null;
  public descriptor:ResourceDescriptor = null;
  public sandcatContainer:Sandcat = null;
  public resource:any = null;

  @BeforeAll()
  public initTest():void {
    this.sandcatContainer = new DefaultSandcatContainer();
    this.descriptor = new ResourceDescriptor();
  }

  @Before()
  public initResourceTest():void {
    this.resource = {};
  }

  @AfterAll()
  public resetTest():void {
    this.sandcatContainer = null;
    this.descriptor = null;
  }

  @After()
  public resetResource():void {
    this.resource = null;
  }

  @Test({
    description: "should create a protected '__sandcatResourceDescriptor' property"
  })
  public decoratePropertyTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    expect(this.resource).to.have.property("__sandcatResourceDescriptor");
  }

  @Test({
    description: "should create an immutable property"
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
    description: "should create a protected 'getResourceDescriptor' method"
  })
  public decorateMethodTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    this.descriptorUtil.decorate();
    expect(this.resource.getResourceDescriptor).to.not.be.undefined;
  }
  
  @Test({
    description: "should create an immutable method"
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
    description: "should do nothing when no methods are registered in the ResourceDescriptor instance"
  })
  public fixCompositeValuesTest():void {
    this.descriptorUtil = new ResourceDescriptorUtil(
      this.resource, this.descriptor, this.sandcatContainer
    );
    expect(this.descriptorUtil.fixCompositeValues()).to.be.OK;
  }
  
  @Test({
    description: "TODO: create all tests for the fixCompositeValues() method",
    disabled: true
  })
  public pendingTest():void { }
}