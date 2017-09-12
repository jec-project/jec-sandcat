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

import { TestSuite, Test, Before, After } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { GETDecorator } from "../../../../../../src/com/onsoft/sandcat/jcad/decorators/GETDecorator";
import { ResourceDescriptor } from "../../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { ResourceDescriptorRegistry } from "../../../../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";
import { MethodDescriptor } from "../../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import { JarsConnectorRefs } from "jec-jars";
import { Decorator, HttpMethod } from "jec-commons";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

@TestSuite({
  description: "Test the GETDecorator class methods"
})
export class GETDecoratorTest {
  
  public decorator:Decorator = null;
  public resourceDesc:ResourceDescriptor = null;
  
  @Before()
  public initTest():void {
    utils.initRegistry();
    this.resourceDesc = ResourceDescriptorRegistry.getRegisteredDescriptor();
    this.decorator = new GETDecorator();
  }

  @After()
  public resetTest():void {
    this.resourceDesc.methodsMap.clear();
    this.resourceDesc = null;
    this.decorator = null;
    utils.resetRegistry();
  }

  @Test({
    description: "should return the reference to the PropertyDescriptor instance"
  })
  public decorateTargetTest():void {
    let target:any = this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    expect(target).to.equal(utils.DESCRIPTOR);
  }
  
  @Test({
    description: "should register information into the ResourceDescriptor by invoking the addMethod() method"
  })
  public addMethodTest():void {
    let spy:any = chai.spy.on(this.resourceDesc, "addMethod");
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    expect(spy).to.have.been.called.once;
  }

  @Test({
    description: "should create a MethodDescriptor object into the ResourceDescriptorRegistry object"
  })
  public newDescriptorTest():void {
    expect(this.resourceDesc.methodsMap.size).to.equal(0);
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    expect(this.resourceDesc.methodsMap.size).to.equal(1);
    this.resourceDesc.methodsMap.forEach((value:any):void=> {
       expect(value).to.be.an.instanceOf(MethodDescriptor);
    });
  }
  
  @Test({
    description: "should create an MethodDescriptor instance accessible from the 'key' parameter"
  })
  public keyTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    expect(this.resourceDesc.methodsMap.get(utils.KEY)).to.not.be.null;
  }
  
  @Test({
    description: "should create an MethodDescriptor instance initialized with HttpMethod.GET"
  })
  public httpMethodTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.httpMethod).to.equal(HttpMethod.GET);
  }

  @Test({
    description: "should create an MethodDescriptor instance with the specified 'name' value"
  })
  public nameTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.name).to.equal(utils.KEY);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'parameterNames' value"
  })
  public parameterNames():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.parameterNames).to.include(utils.PARAM_NAME_1);
    expect(desc.parameterNames).to.include(utils.PARAM_NAME_2);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'action' value"
  })
  public actionTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.action).to.equal(utils.DESCRIPTOR.value);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'route' value"
  })
  public routeTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.route).to.equal(utils.ROUTE);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'consumes' value"
  })
  public consumesTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.consumes).to.equal(utils.CONSUMES);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'produces' value"
  })
  public producesTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.produces).to.equal(utils.PRODUCES);
  }
  
  @Test({
    description: "should create an MethodDescriptor instance with the specified 'crossDomainPolicy' value"
  })
  public crossDomainPolicyTest():void {
    this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.PARAMS
    );
    let desc:MethodDescriptor = this.resourceDesc.methodsMap.get(utils.KEY);
    expect(desc.crossDomainPolicy).to.equal(utils.CROSS_DOMAIN_POLICY);
  }
}