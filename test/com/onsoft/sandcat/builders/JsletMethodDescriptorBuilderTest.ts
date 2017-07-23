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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { JsletMethodDescriptorBuilder } from "../../../../../src/com/onsoft/sandcat/builders/JsletMethodDescriptorBuilder";
import { JsletMethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethodDescriptor";
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";

@TestSuite({
  description: "Test the JsletMethodDescriptorBuilder class properties"
})
export class JsletMethodDescriptorBuilderTest {

  public builder:JsletMethodDescriptorBuilder = null;
  public propertyDescriptor:PropertyDescriptor = null;
  public key:string = null;

  @BeforeAll()
  public initTest():void {
    this.propertyDescriptor = ( { value: "any" } as PropertyDescriptor );
    this.builder = new JsletMethodDescriptorBuilder();
    this.key = "methodName";
  }
  
  @Test({
    description: "should return an instance of the JsletMethodDescriptor class"
  })
  public buildTest():void {
    expect(
      this.builder.build(JsletMethod.AFTER, this.key, this.propertyDescriptor)
    ).to.be.an.instanceOf(JsletMethodDescriptor);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'name' property value"
  })
  public nameTest():void {
    let desc:JsletMethodDescriptor = 
      this.builder.build(JsletMethod.AFTER, this.key, this.propertyDescriptor);
    expect(desc.name).to.equal(this.key);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'action' property value"
  })
  public actionTest():void {
    let desc:JsletMethodDescriptor = 
      this.builder.build(JsletMethod.AFTER, this.key, this.propertyDescriptor);
    expect(desc.action).to.equal(this.propertyDescriptor.value);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'jsletMethod' property value"
  })
  public jsletMethodTest():void {
    let desc:JsletMethodDescriptor = 
      this.builder.build(JsletMethod.AFTER, this.key, this.propertyDescriptor);
    expect(desc.jsletMethod).to.equal(JsletMethod.AFTER);
  }
}