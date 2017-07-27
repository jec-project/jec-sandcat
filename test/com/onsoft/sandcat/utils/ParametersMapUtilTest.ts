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

import { TestSuite, Test, BeforeAll, AfterAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { ParametersMapUtil } from "../../../../../src/com/onsoft/sandcat/utils/ParametersMapUtil";
import { ParameterDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

@TestSuite({
  description: "Test the ParametersMapUtil class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class ParametersMapUtilTest {

  public readonly NAME:string = "methodName";

  @BeforeAll()
  public initTest():void {
    utils.initRegistry();
  }
  
  @AfterAll()
  public resetTest():void {
    utils.resetRegistry();
  }
  
  @Test({
    description: "should return an empty array when the specified reference does not exist",
    order: 1
  })
  public getParameterCollectionDefaultTest():void {
    let descriptors:ParameterDescriptor[] = 
                            ParametersMapUtil.getParameterCollection(this.NAME);
    expect(descriptors).to.have.a.lengthOf(0);
  }
  
  @Test({
    description: "should return an array when the specified reference exists",
    order: 2
  })
  public getParameterCollectionTest():void {
    let descriptors:ParameterDescriptor[] = 
                            ParametersMapUtil.getParameterCollection(this.NAME);
    expect(descriptors).to.have.a.lengthOf(0);
  }
}