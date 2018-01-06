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
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/JsletMethodTestUtils";

@TestSuite({
  description: "Test the JsletMethod enum values"
})
export class JsletMethodTest {

  @Test({
    description: "JsletMethod.INIT should be equal to '0'"
  })
  public INITTest():void {
    expect(JsletMethod.INIT).to.equal(utils.INIT);
  }

  @Test({
    description: "JsletMethod.DESTROY should be equal to '1'"
  })
  public DESTROYTest():void {
    expect(JsletMethod.DESTROY).to.equal(utils.DESTROY);
  }

  @Test({
    description: "JsletMethod.QUERY_PARAM should be equal to '2'"
  })
  public BEFORETest():void {
    expect(JsletMethod.BEFORE).to.equal(utils.BEFORE);
  }
  
  @Test({
    description: "JsletMethod.AFTER should be equal to '3'"
  })
  public AFTERTest():void {
    expect(JsletMethod.AFTER).to.equal(utils.AFTER);
  }
}