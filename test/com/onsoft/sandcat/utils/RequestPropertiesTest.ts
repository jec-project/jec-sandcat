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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { RequestProperties } from "../../../../../src/com/onsoft/sandcat/utils/RequestProperties";

@TestSuite({
  description: "Test the RequestProperties class properties"
})
export class RequestPropertiesTest {

  public properties:RequestProperties = null;

  @BeforeAll()
  public initTest():void {
    this.properties = new RequestProperties();
  }

  @Test({
    description: "should have a 'httpMethod' property set to 'null'"
  })
  public httpMethodTest():void {
    expect(this.properties).to.have.property("httpMethod", null);
  }
  
  @Test({
    description: "should have a 'acccept' property set to 'null'"
  })
  public accceptTest():void {
    expect(this.properties).to.have.property("acccept", null);
  }
  
  @Test({
    description: "should have an 'contentType' property set to 'null'"
  })
  public contentTypeTest():void {
    expect(this.properties).to.have.property("contentType", null);
  }

  @Test({
    description: "should have an 'subRoute' property set to 'null'"
  })
  public subRouteTest():void {
    expect(this.properties).to.have.property("subRoute", null);
  }
}