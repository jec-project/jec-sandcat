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

import { TestSuite, Test, Before, After } from "jec-juta";
import { expect } from "chai";
import { RootPathRefsDecorator } from "../../../../../../src/com/onsoft/sandcat/jcad/decorators/RootPathRefsDecorator";
import { JarsError } from "jec-jars";
import { Decorator } from "jec-commons";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

@TestSuite({
  description: "Test the RootPathRefsDecorator class methods"
})
export class RootPathRefsDecoratorTest {
  
  public decorator:Decorator = null;
  
  @Before()
  public initTest():void {
    utils.initRegistry();
    this.decorator = new RootPathRefsDecorator();
  }

  @After()
  public resetTest():void {
    this.decorator = null;
    utils.resetRegistry();
  }

  @Test({
    description: "should throw a JarsError exception if 'pathRefs' parameter is 'null'"
  })
  public decoratePathRefsErrorTest():void {
    const doDecorate:Function = function():void {
      this.decorator.decorate(utils.TARGET, null);
    };
    expect(doDecorate.bind(this)).to.throw(JarsError);
  }

  @Test({
    description: "should return the reference to the target instance"
  })
  public decorateTargetTest():void {
    const target:any = this.decorator.decorate(utils.TARGET, []);
    expect(target).to.equal(utils.TARGET);
  }
}