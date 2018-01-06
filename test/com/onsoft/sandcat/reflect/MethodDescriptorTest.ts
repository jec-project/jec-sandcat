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
import { MethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";

@TestSuite({
  description: "Test the MethodDescriptor class properties"
})
export class MethodDescriptorTest {

  public descriptor:MethodDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new MethodDescriptor();
  }

  @Test({
    description: "should have a 'httpMethod' property set to 'null'"
  })
  public httpMethodTest():void {
    expect(this.descriptor).to.have.property("httpMethod", null);
  }
  
  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.descriptor).to.have.property("name", null);
  }
  
  @Test({
    description: "should have an 'action' property set to 'null'"
  })
  public actionTest():void {
    expect(this.descriptor).to.have.property("action", null);
  }

  @Test({
    description: "should have an 'parameterNames' property set to 'null'"
  })
  public parameterNamesTest():void {
    expect(this.descriptor).to.have.property("parameterNames", null);
  }

  @Test({
    description: "should have an 'route' property set to 'null'"
  })
  public routeTest():void {
    expect(this.descriptor).to.have.property("route", null);
  }
  
  @Test({
    description: "should have an 'consumes' property set to 'null'"
  })
  public consumesTest():void {
    expect(this.descriptor).to.have.property("consumes", null);
  }
  
  @Test({
    description: "should have an 'crossDomainPolicy' property set to 'null'"
  })
  public crossDomainPolicyTest():void {
    expect(this.descriptor).to.have.property("crossDomainPolicy", null);
  }
  
  @Test({
    description: "should have an 'produces' property set to 'null'"
  })
  public producesTest():void {
    expect(this.descriptor).to.have.property("produces", null);
  }
  
  @Test({
    description: "should have an 'urlPatterns' property set to 'null'"
  })
  public urlPatternsTest():void {
    expect(this.descriptor).to.have.property("urlPatterns", null);
  }
  
  @Test({
    description: "should have a 'parametersMap' property set to an empty 'Map' instance"
  })
  public parametersMapTest():void {
    expect(this.descriptor.parametersMap.size).to.equal(0);
  }
}