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
import { BasicRootPathVersion } from "../../../../../src/com/onsoft/sandcat/reflect/BasicRootPathVersion";

@TestSuite({
  description: "Test the BasicRootPathVersion class properties"
})
export class BasicRootPathVersionTest {

  public version:BasicRootPathVersion = null;

  @BeforeAll()
  public initTest():void {
    this.version = new BasicRootPathVersion();
  }

  @Test({
    description: "should have a 'major' property set to 'null'"
  })
  public majorTest():void {
    expect(this.version).to.have.property("major", null);
  }
  
  @Test({
    description: "should have a 'minor' property set to 'null'"
  })
  public minorTest():void {
    expect(this.version).to.have.property("minor", null);
  }
  
  @Test({
    description: "should have a 'prefix' property set to 'null'"
  })
  public prefixTest():void {
    expect(this.version).to.have.property("prefix", null);
  }
}