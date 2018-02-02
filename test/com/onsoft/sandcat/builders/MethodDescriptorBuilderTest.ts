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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { MethodDescriptorBuilder } from "../../../../../src/com/onsoft/sandcat/builders/MethodDescriptorBuilder";
import { MethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import { HttpMethodParams } from "jec-jars";
import { HttpMethod, SingletonError } from "jec-commons";

@TestSuite({
  description: "Test the MethodDescriptorBuilder class properties"
})
export class MethodDescriptorBuilderTest {

  public propertyDescriptor:PropertyDescriptor = null;
  public key:string = null;
  public httpParams:HttpMethodParams = null;

  @BeforeAll()
  public initTest():void {
    let func:Function = function(param1:string, param2:string):void {};
    this.propertyDescriptor = ( { value: func } as PropertyDescriptor );
    this.key = "methodName";
    this.httpParams = {
      route: "foo/bar",
      consumes: "application/json",
      produces: "application/json",
      crossDomainPolicy: "*"
    };
  }
  
  @Test({
    description: "should throw a singleton error when calling the constructor function"
  })
  public newInstanceTest():void {
    let buildInstance:Function = function():void {
      new MethodDescriptorBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a MethodDescriptorBuilder instance"
  })
  public getInstanceTest():void {
    let builder:MethodDescriptorBuilder =
                                          MethodDescriptorBuilder.getInstance();
    expect(builder).to.be.an.instanceOf(MethodDescriptorBuilder);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    let builder1:MethodDescriptorBuilder =
                                          MethodDescriptorBuilder.getInstance();
    let builder2:MethodDescriptorBuilder =
                                          MethodDescriptorBuilder.getInstance();
    expect(builder1).to.equal(builder2);
  }
  
  @Test({
    description: "should return an instance of the MethodDescriptor class"
  })
  public buildTest():void {
    expect(
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      )
    ).to.be.an.instanceOf(MethodDescriptor);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'name' property value"
  })
  public nameTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.name).to.equal(this.key);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'httpMethod' property value"
  })
  public httpMethodTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.httpMethod).to.equal(HttpMethod.GET);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'action' property value"
  })
  public actionTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.action).to.equal(this.propertyDescriptor.value);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the 'route' property set to 'null'"
  })
  public routeNullTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.route).to.be.null;
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the 'produces' property set to 'null'"
  })
  public producesNullTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.produces).to.be.null;
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the 'crossDomainPolicy' property set to 'null'"
  })
  public crossDomainPolicyNullTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.crossDomainPolicy).to.be.null;
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the 'consumes' property set to 'null'"
  })
  public consumesNullTest():void {
    let desc:MethodDescriptor = 
      MethodDescriptorBuilder.getInstance().build(
        HttpMethod.GET, this.key, this.propertyDescriptor
      );
    expect(desc.consumes).to.be.null;
  }

  @Test({
    description: "should return a MethodDescriptor instance with the correct 'route' property value"
  })
  public routeTest():void {
    let desc:MethodDescriptor = MethodDescriptorBuilder.getInstance().build(
      HttpMethod.GET, this.key, this.propertyDescriptor, this.httpParams
    );
    expect(desc.route).to.equal(this.httpParams.route);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'consumes' property value"
  })
  public consumesTest():void {
    let desc:MethodDescriptor = MethodDescriptorBuilder.getInstance().build(
      HttpMethod.GET, this.key, this.propertyDescriptor, this.httpParams
    );
    expect(desc.consumes).to.equal(this.httpParams.consumes);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'produces' property value"
  })
  public producesTest():void {
    let desc:MethodDescriptor = MethodDescriptorBuilder.getInstance().build(
      HttpMethod.GET, this.key, this.propertyDescriptor, this.httpParams
    );
    expect(desc.produces).to.equal(this.httpParams.produces);
  }
  
  @Test({
    description: "should return a MethodDescriptor instance with the correct 'crossDomainPolicy' property value"
  })
  public crossDomainPolicyTest():void {
    let desc:MethodDescriptor = MethodDescriptorBuilder.getInstance().build(
      HttpMethod.GET, this.key, this.propertyDescriptor, this.httpParams
    );
    expect(desc.crossDomainPolicy).to.equal(this.httpParams.crossDomainPolicy);
  }
}