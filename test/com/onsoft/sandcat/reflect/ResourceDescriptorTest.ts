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
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { MethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import { JsletMethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethodDescriptor";
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";

@TestSuite({
  description: "Test the ResourceDescriptor class properties and methods"
})
export class ResourceDescriptorTest {

  public descriptor:ResourceDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new ResourceDescriptor();
  }
  
  @Test({
    description: "should have a 'urlPatterns' property set to 'null'"
  })
  public urlPatternsTest():void {
    expect(this.descriptor).to.have.property("urlPatterns", null);
  }
  
  @Test({
    description: "should have a 'resourcePath' property set to 'null'"
  })
  public resourcePathTest():void {
    expect(this.descriptor).to.have.property("resourcePath", null);
  }
  
  @Test({
    description: "should have a 'contextRoot' property set to 'null'"
  })
  public contextRootTest():void {
    expect(this.descriptor).to.have.property("contextRoot", null);
  }
  
  @Test({
    description: "should have a 'rootPathRefs' property set to 'null'"
  })
  public rootPathRefsTest():void {
    expect(this.descriptor).to.have.property("rootPathRefs", null);
  }
  
  @Test({
    description: "should have a 'methodsMap' property initialized with an empty 'Map' object"
  })
  public methodsMapTest():void {
    expect(this.descriptor.methodsMap.size).to.equal(0);
  }
  
  @Test({
    description: "should have a 'jsletMethodsMap' property initialized with an empty 'Map' object"
  })
  public jsletMethodsMapTest():void {
    expect(this.descriptor.jsletMethodsMap.size).to.equal(0);
  }
  
  @Test({
    description: "should have a 'crossDomainPolicy' property set to 'null'"
  })
  public crossDomainPolicyTest():void {
    expect(this.descriptor).to.have.property("crossDomainPolicy", null);
  }
  
  @Test({
    description: "should have an 'consumes' property set to 'null'"
  })
  public consumesTest():void {
    expect(this.descriptor).to.have.property("consumes", null);
  }

  @Test({
    description: "should have an 'produces' property set to 'null'"
  })
  public producesTest():void {
    expect(this.descriptor).to.have.property("produces", null);
  }
  
  @Test({
    description: "should add the specified MethodDescriptor isnatnce to the 'methodsMap' object"
  })
  public addMethodTest():void {
    let methodDesc:MethodDescriptor = new MethodDescriptor();
    methodDesc.name = "methodName";
    this.descriptor.addMethod(methodDesc);
    expect(
      this.descriptor.methodsMap.get(methodDesc.name)
    ).to.equal(methodDesc);
    this.descriptor.methodsMap.clear();
  }
  
  @Test({
    description: "should add the specified JsletMethodDescriptor isnatnce to the 'jsletMethodsMap' object"
  })
  public addJsletMethodTest():void {
    let methodDesc:JsletMethodDescriptor = new JsletMethodDescriptor();
    methodDesc.jsletMethod = JsletMethod.AFTER;
    this.descriptor.addJsletMethod(methodDesc);
    expect(
      this.descriptor.jsletMethodsMap.get(JsletMethod.AFTER)
    ).to.equal(methodDesc);
    this.descriptor.jsletMethodsMap.clear();
  }
}