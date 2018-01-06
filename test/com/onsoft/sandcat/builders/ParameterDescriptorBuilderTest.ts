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
import { ParameterDescriptorBuilder } from "../../../../../src/com/onsoft/sandcat/builders/ParameterDescriptorBuilder";
import { ParameterDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";
import { AnnotationType } from "../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";

@TestSuite({
  description: "Test the ParameterDescriptorBuilder class properties"
})
export class ParameterDescriptorBuilderTest {

  public builder:ParameterDescriptorBuilder = null;
  public methodName:string = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new ParameterDescriptorBuilder();
    this.methodName = "myMethodName";
  }
  
  @Test({
    description: "should return an instance of the ParameterDescriptor class"
  })
  public buildTest():void {
    expect(
      this.builder.build(this.methodName, AnnotationType.GET, 2)
    ).to.be.an.instanceOf(ParameterDescriptor);
  }
  
  @Test({
    description: "should return a ParameterDescriptor instance with the correct 'methodName' property value"
  })
  public methodNameTest():void {
    let desc:ParameterDescriptor = 
                     this.builder.build(this.methodName, AnnotationType.GET, 2);
    expect(desc.methodName).to.equal(this.methodName);
  }
  
  @Test({
    description: "should return a ParameterDescriptor instance with the correct 'annotationType' property value"
  })
  public annotationTypeTest():void {
    let desc:ParameterDescriptor = 
                     this.builder.build(this.methodName, AnnotationType.GET, 2);
    expect(desc.annotationType).to.equal(AnnotationType.GET);
  }
  
  @Test({
    description: "should return a ParameterDescriptor instance with the correct 'index' property value"
  })
  public indexTest():void {
    let desc:ParameterDescriptor = 
                     this.builder.build(this.methodName, AnnotationType.GET, 2);
    expect(desc.index).to.equal(2);
  }
}