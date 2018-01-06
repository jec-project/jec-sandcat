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
import { JsletMethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethodDescriptor";

@TestSuite({
  description: "Test the JsletMethodDescriptor class properties"
})
export class JsletMethodDescriptorTest {

  public descriptor:JsletMethodDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new JsletMethodDescriptor();
  }

  @Test({
    description: "should have a 'jsletMethod' property set to 'null'"
  })
  public jsletMethodTest():void {
    expect(this.descriptor).to.have.property("jsletMethod", null);
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
}