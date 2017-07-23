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
import { InitDecorator } from "../../../../../../src/com/onsoft/sandcat/jcad/decorators/InitDecorator";
import { ResourceDescriptor } from "../../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { ResourceDescriptorRegistry } from "../../../../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";
import { JsletMethodDescriptor } from "../../../../../../src/com/onsoft/sandcat/reflect/JsletMethodDescriptor";
import { JsletMethod } from "../../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";
import { Decorator } from "jec-commons";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";


@TestSuite({
  description: "Test the InitDecorator class methods"
})
export class InitDecoratorTest {
  
  public decorator:Decorator = null;
  public resourceDesc:ResourceDescriptor = null;
  
  @Before()
  public initTest():void {
    utils.initRegistry();
    this.resourceDesc = ResourceDescriptorRegistry.getRegisteredDescriptor();
    this.decorator = new InitDecorator();
  }

  @After()
  public resetTest():void {
    this.resourceDesc.jsletMethodsMap.clear();
    this.resourceDesc = null;
    this.decorator = null;
    utils.resetRegistry();
  }

  @Test({
    description: "should return the reference to the target instance"
  })
  public decorateTargetTest():void {
    let target:any = this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.DESCRIPTOR
    );
    expect(target).to.equal(utils.TARGET);
  }
  
  @Test({
    description: "should register information into the ResourceDescriptor by invoking the addJsletMethod() method"
  })
  public addJsletMethodTest():void {
    let spy:any = chai.spy.on(this.resourceDesc, "addJsletMethod");
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    expect(spy).to.have.been.called.once;
  }

  @Test({
    description: "should create a JsletMethodDescriptor object into the ResourceDescriptorRegistry object"
  })
  public newDescriptorTest():void {
    expect(this.resourceDesc.jsletMethodsMap.size).to.equal(0);
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    expect(this.resourceDesc.jsletMethodsMap.size).to.equal(1);
    this.resourceDesc.jsletMethodsMap.forEach((value:any):void=> {
      expect(value).to.be.an.instanceOf(JsletMethodDescriptor);
    });
  }
  
  @Test({
    description: "should create an JsletMethodDescriptor instance accessible with the 'JsletMethod.INIT' constant"
  })
  public keyTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    expect(
      this.resourceDesc.jsletMethodsMap.get(JsletMethod.INIT)
    ).to.not.be.null;
  }
  
  @Test({
    description: "should create an JsletMethodDescriptor instance initialized with JsletMethod.INIT"
  })
  public httpMethodTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    let desc:JsletMethodDescriptor = 
                       this.resourceDesc.jsletMethodsMap.get(JsletMethod.INIT);
    expect(desc.jsletMethod).to.equal(JsletMethod.INIT);
  }

  @Test({
    description: "should create an MethodDescriptor instance with the specified 'name' value"
  })
  public nameTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    let desc:JsletMethodDescriptor = 
                    this.resourceDesc.jsletMethodsMap.get(JsletMethod.INIT);
    expect(desc.name).to.equal(utils.KEY);
  }

  @Test({
    description: "should create an MethodDescriptor instance with the specified 'action' value"
  })
  public actionTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR);
    let desc:JsletMethodDescriptor = 
                    this.resourceDesc.jsletMethodsMap.get(JsletMethod.INIT);
    expect(desc.action).to.equal(utils.DESCRIPTOR.value);
  }
}