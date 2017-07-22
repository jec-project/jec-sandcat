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

import { TestSuite, Test, Before, After } from "jec-juta";
import { expect } from "chai";
import { RequestParamDecorator } from "../../../../../../src/com/onsoft/sandcat/jcad/decorators/RequestParamDecorator";
import { ParametersMapUtil } from "../../../../../../src/com/onsoft/sandcat/utils/ParametersMapUtil";
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";
import { AnnotationType } from "../../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";
import { Decorator } from "jec-commons";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

@TestSuite({
  description: "Test the RequestParamDecorator class methods"
})
export class RequestParamDecoratorTest {
  
  public decorator:Decorator = null;
  
  @Before()
  public initTest():void {
    utils.initRegistry();
    this.decorator = new RequestParamDecorator();
  }

  @After()
  public resetTest():void {
    this.decorator = null;
    utils.resetRegistry();
  }

  @Test({
    description: "should return the reference to the target instance"
  })
  public decorateTargetTest():void {
    let target:any = this.decorator.decorate(
      utils.TARGET, utils.KEY, utils.PARAMETER_INDEX
    );
    expect(target).to.equal(utils.TARGET);
  }
  
  @Test({
    description: "should create a reference into the parameter collection registery"
  })
  public getParameterCollectionTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    expect(
      ParametersMapUtil.getParameterCollection(utils.KEY)
    ).to.not.be.null
  }

  @Test({
    description: "should add ParameterDescriptor isntance to the collection registery"
  })
  public instanceOfTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    expect(
      ParametersMapUtil.getParameterCollection(utils.KEY)[0]
    ).to.be.an.instanceOf(ParameterDescriptor);
  }

  @Test({
    description: "should create a ParameterDescriptor instance with the specified 'index' value"
  })
  public indexTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    let desc:ParameterDescriptor = 
                         ParametersMapUtil.getParameterCollection(utils.KEY)[0];
    expect(desc.index).to.equal(utils.PARAMETER_INDEX);
  }

  @Test({
    description: "should create a ParameterDescriptor instance with the specified 'methodName' value"
  })
  public methodNameTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    let desc:ParameterDescriptor = 
                         ParametersMapUtil.getParameterCollection(utils.KEY)[0];
    expect(desc.methodName).to.equal(utils.KEY);
  }

  @Test({
    description: "should create a ParameterDescriptor instance initialized with AnnotationType.HTTP_REQUEST"
  })
  public annotationTypeTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    let desc:ParameterDescriptor = 
                         ParametersMapUtil.getParameterCollection(utils.KEY)[0];
    expect(desc.annotationType).to.equal(AnnotationType.HTTP_REQUEST);
  }
  
  @Test({
    description: "should create a ParameterDescriptor instance with 'key' set to 'null'"
  })
  public keyTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    let desc:ParameterDescriptor = 
                         ParametersMapUtil.getParameterCollection(utils.KEY)[0];
    expect(desc.key).to.be.null;
  }
  
  @Test({
    description: "should create a ParameterDescriptor instance with 'value' set to 'null'"
  })
  public valueTest():void {
    this.decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
    let desc:ParameterDescriptor = 
                         ParametersMapUtil.getParameterCollection(utils.KEY)[0];
    expect(desc.value).to.be.null;
  }
}