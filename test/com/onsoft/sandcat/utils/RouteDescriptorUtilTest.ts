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

import { TestSuite, Test, BeforeAll, TestSorters, Async } from "jec-juta";
import { expect, assert } from "chai";
import { RouteDescriptorUtil } from "../../../../../src/com/onsoft/sandcat/utils/RouteDescriptorUtil";
import { RouteDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RouteDescriptor";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/RouteDescriptorUtilTestUtils";
import { HttpMethod } from "jec-commons";

@TestSuite({
  description: "Test the RouteDescriptorUtil class properties."
})
export class RouteDescriptorUtilTest {

  public descriptorUtil:RouteDescriptorUtil = null;
  public descriptor:RouteDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptorUtil = new RouteDescriptorUtil();
    this.descriptor = new RouteDescriptor(
      utils.PATTERN, "getMethod", HttpMethod.GET
    );
  }
  
  @Test({
    description: "should invoke the result() callback method with the correct result"
  })
  public matchOkTest(@Async done:Function):void {
    this.descriptorUtil.match(
      this.descriptor,
      utils.VALID_PATH,
      (result:any)=> {
        expect(result.id).to.equal('10');
        done();
      },
      ()=> {
        assert.fail(null, utils.VALID_PATH, "Test should not fail");
      }
    );
  }
  
  @Test({
    description: "should invoke the fail() callback method"
  })
  public matchKoTest(@Async done:Function):void {
    this.descriptorUtil.match(
      this.descriptor,
      utils.INVALID_PATH,
      (result:any)=> {
        assert.fail(null, result, "Test should fail");
      },
      ()=> {
        done();
      }
    );
  }
  
  @Test({
    description: "should return 'true'"
  })
  public testOkTest():void {
    expect(
      this.descriptorUtil.test(this.descriptor, utils.VALID_PATH)
    ).to.be.true;
  }
  
  @Test({
    description: "should return 'false'"
  })
  public testKoTest():void {
    expect(
      this.descriptorUtil.test(this.descriptor, utils.INVALID_PATH)
    ).to.be.false;
  }
  
  @Test({
    description: "should return the route parameters of the specified URL"
  })
  public execOkTest():void {
    let result:any = 
                    this.descriptorUtil.exec(this.descriptor, utils.VALID_PATH);
    expect(result.id).to.equal('10');
  }
  
  @Test({
    description: "should return 'null'"
  })
  public execKoTest():void {
    expect(
      this.descriptorUtil.exec(this.descriptor, utils.INVALID_PATH)
    ).to.be.null;
  }
}