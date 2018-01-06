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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { UrlPatternMapperBuilder } from "../../../../../src/com/onsoft/sandcat/builders/UrlPatternMapperBuilder";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import { UrlPatternMapper } from "../../../../../src/com/onsoft/sandcat/core/UrlPatternMapper";

@TestSuite({
  description: "Test the UrlPatternMapperBuilder class properties"
})
export class UrlPatternMapperBuilderTest {
  
  @Test({
    description: "should return a new UrlPatternMapper object"
  })
  public buildTest():void {
    let builder = new UrlPatternMapperBuilder();
    let descriptor:ResourceDescriptor = new ResourceDescriptor();
    expect(
      builder.build(descriptor)
    ).to.be.an.instanceOf(UrlPatternMapper);
  }
}