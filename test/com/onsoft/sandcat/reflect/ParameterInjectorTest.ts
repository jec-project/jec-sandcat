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

import { TestSuite, Test, BeforeAll, After } from "jec-juta";
import { expect } from "chai";
import { ParameterInjector } from "../../../../../src/com/onsoft/sandcat/reflect/ParameterInjector";
import {AnnotationType} from "../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/ParameterInjectorTestUtils";

@TestSuite({
  description: "TODO: create all tests for the ParameterInjector class"
})
export class ParameterInjectorTest {

  public injector:ParameterInjector = null;

  @BeforeAll()
  public initTest():void {
    this.injector = new ParameterInjector();
  }
  
  @After()
  public resetMethodDescriptor():void {
    utils.METHOD_DESCRIPTOR.parametersMap.clear();
  }

  @Test({
    description: "should return an array of parameters composed of the calback handler at index 0"
  })
  public buildExitTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, utils.buildParameterDescriptor(AnnotationType.EXIT)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.CALLBACK_HANDLER);
  }

  @Test({
    description: "should return an array of parameters composed of the correct path parameter value at index 0"
  })
  public buildPathParamTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, 
      utils.buildParameterDescriptor(AnnotationType.PATH_PARAM)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.PROPERTY_VALUE);
  }
  
  @Test({
    description: "should return an array of parameters composed of the HttpRequest object at index 0"
  })
  public buildHttpRequestTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, 
      utils.buildParameterDescriptor(AnnotationType.HTTP_REQUEST)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.REQUEST);
  }
  
  @Test({
    description: "should return an array of parameters composed of the correct query value at index 0"
  })
  public buildQueryParamTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, 
      utils.buildParameterDescriptor(AnnotationType.QUERY_PARAM)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.QUERY_PARAM_VALUE);
  }
  
  @Test({
    description: "should return an array of parameters composed of the HTTP request body at index 0"
  })
  public buildRequestBodyTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, 
      utils.buildParameterDescriptor(AnnotationType.REQUEST_BODY)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.BODY);
  }
  
  @Test({
    description: "should return an array of parameters composed of the correct cookie value at index 0"
  })
  public buildCookieParamTest():void {
    utils.METHOD_DESCRIPTOR.parametersMap.set(
      utils.PARAMETER_NAME, 
      utils.buildParameterDescriptor(AnnotationType.COOKIE_PARAM)
    );
    let result:any[] = this.injector.buildParameters(
      utils.MATCHER,
      utils.CALLBACK_HANDLER,
      utils.METHOD_DESCRIPTOR,
      utils.REQUEST
    );
    expect(result[0]).to.equal(utils.COOKIES.parameterName);
  }
}