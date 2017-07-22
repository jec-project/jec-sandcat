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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { AnnotationParamFactory } from "../../../../../src/com/onsoft/sandcat/annotations/AnnotationParamFactory";
import { AnnotationType } from "../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";
import { ParametersMapUtil } from "../../../../../src/com/onsoft/sandcat/utils/ParametersMapUtil";
import { ParameterDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";
import { ResourceDescriptorRegistry } from "../../../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";
import { ResourceDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";

@TestSuite({
  description: "Test the AnnotationParamFactory class properties"
})
export class AnnotationParamFactoryTest {

  @BeforeAll()
  public initTest():void {
    let desc:ResourceDescriptor = new ResourceDescriptor();
    ResourceDescriptorRegistry.registerDescriptor(desc);
  }
  
  @AfterAll()
  public resetTest():void {
    ResourceDescriptorRegistry.getParametersMap().clear();
  }
  
  @Test({
    description: "should register the specified parameters into the ParametersMapUtil registery"
  })
  public registerParamTest():void {
    let factory:AnnotationParamFactory = new AnnotationParamFactory();
    let propertyKey:string = "methodName";
    factory.registerParam(propertyKey, 1, AnnotationType.GET);
    let descs:ParameterDescriptor[] =
                          ParametersMapUtil.getParameterCollection(propertyKey);
    expect(descs).to.have.a.lengthOf(1);
    expect(descs[0].annotationType).to.equal(AnnotationType.GET);
    expect(descs[0].index).to.equal(1);
  }
}