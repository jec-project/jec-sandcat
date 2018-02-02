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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { JsletMethodDescriptorBuilder } from "../../../../../src/com/onsoft/sandcat/builders/JsletMethodDescriptorBuilder";
import { JsletMethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethodDescriptor";
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";
import { SingletonError } from "jec-commons";

@TestSuite({
  description: "Test the JsletMethodDescriptorBuilder class properties"
})
export class JsletMethodDescriptorBuilderTest {

  public propertyDescriptor:PropertyDescriptor = null;
  public key:string = null;

  @BeforeAll()
  public initTest():void {
    this.propertyDescriptor = ( { value: "any" } as PropertyDescriptor );
    this.key = "methodName";
  }
  
  @Test({
    description: "should throw a singleton error when calling the constructor function"
  })
  public newInstanceTest():void {
    let buildInstance:Function = function():void {
      new JsletMethodDescriptorBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptorBuilder instance"
  })
  public getInstanceTest():void {
    let builder:JsletMethodDescriptorBuilder =
                                     JsletMethodDescriptorBuilder.getInstance();
    expect(builder).to.be.an.instanceOf(JsletMethodDescriptorBuilder);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    let builder1:JsletMethodDescriptorBuilder =
                                     JsletMethodDescriptorBuilder.getInstance();
    let builder2:JsletMethodDescriptorBuilder =
                                     JsletMethodDescriptorBuilder.getInstance();
    expect(builder1).to.equal(builder2);
  }
  
  @Test({
    description: "should return an instance of the JsletMethodDescriptor class"
  })
  public buildTest():void {
    expect(
      JsletMethodDescriptorBuilder.getInstance().build(
        JsletMethod.AFTER, this.key, this.propertyDescriptor
      )
    ).to.be.an.instanceOf(JsletMethodDescriptor);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'name' property value"
  })
  public nameTest():void {
    let desc:JsletMethodDescriptor = 
      JsletMethodDescriptorBuilder.getInstance().build(
        JsletMethod.AFTER, this.key, this.propertyDescriptor
      );
    expect(desc.name).to.equal(this.key);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'action' property value"
  })
  public actionTest():void {
    let desc:JsletMethodDescriptor = 
      JsletMethodDescriptorBuilder.getInstance().build(
        JsletMethod.AFTER, this.key, this.propertyDescriptor
      );
    expect(desc.action).to.equal(this.propertyDescriptor.value);
  }
  
  @Test({
    description: "should return a JsletMethodDescriptor instance with the correct 'jsletMethod' property value"
  })
  public jsletMethodTest():void {
    let desc:JsletMethodDescriptor = 
      JsletMethodDescriptorBuilder.getInstance().build(
        JsletMethod.AFTER, this.key, this.propertyDescriptor
      );
    expect(desc.jsletMethod).to.equal(JsletMethod.AFTER);
  }
}