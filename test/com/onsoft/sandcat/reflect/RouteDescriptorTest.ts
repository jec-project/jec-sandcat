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
import { RouteDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RouteDescriptor";
import { HttpMethod } from "jec-commons";
import * as UrlPattern from "url-pattern";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/RouteDescriptorTestUtils";

@TestSuite({
  description: "Test the RouteDescriptor class properties"
})
export class RouteDescriptorTest {

  public descriptor:RouteDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new RouteDescriptor(
      utils.PATTERN,
      utils.MAPPED_METHOD,
      HttpMethod.GET
    );
  }
  
  @Test({
    description: "should return the same pattern string as passed to the constructor function"
  })
  public getPatternStringTest():void {
    expect(this.descriptor.getPatternString()).to.equal(utils.PATTERN);
  }
  
  @Test({
    description: "should return the same HTTP method reference as passed to the constructor function"
  })
  public getHttpMethodTest():void {
    expect(this.descriptor.getHttpMethod()).to.equal(HttpMethod.GET);
  }
  
  @Test({
    description: "should return the same method name as passed to the constructor function"
  })
  public getMappedMethodTest():void {
    expect(this.descriptor.getMappedMethod()).to.equal(utils.MAPPED_METHOD);
  }
  
  @Test({
    description: "should return an instance of the UrlPattern class"
  })
  public getUrlPatternTest():void {
    expect(this.descriptor.getUrlPattern()).to.be.an.instanceOf(UrlPattern);
  }
}