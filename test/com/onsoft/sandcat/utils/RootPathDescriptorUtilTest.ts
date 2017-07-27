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

import { TestSuite, Test, BeforeAll, AfterAll, Before, After } from "jec-juta";
import { expect } from "chai";
import { RootPathDescriptorUtil } from "../../../../../src/com/onsoft/sandcat/utils/RootPathDescriptorUtil";
import { RootPathDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";


@TestSuite({
  description: "Test the RootPathDescriptorUtil class properties"
})
export class RootPathDescriptorUtilTest {

  public descriptorUtil:RootPathDescriptorUtil = null;
  public descriptor:RootPathDescriptor = null;
  public rootPath:any = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new RootPathDescriptor();
  }

  @Before()
  public initRootPathTest():void {
    this.rootPath = {};
  }

  @AfterAll()
  public resetTest():void {
    this.descriptor = null;
  }

  @After()
  public resetRootPathTest():void {
    this.rootPath = null;
  }

  @Test({
    description: "should create a protected '__sandcatRootPathDescriptor' property"
  })
  public decoratePropertyTest():void {
    this.descriptorUtil = new RootPathDescriptorUtil(
      this.rootPath, this.descriptor
    );
    this.descriptorUtil.decorate();
    expect(this.rootPath).to.have.property("__sandcatRootPathDescriptor");
  }

  @Test({
    description: "should create an immutable property"
  })
  public decorateImmutablePropertyTest():void {
    this.descriptorUtil = new RootPathDescriptorUtil(
      this.rootPath, this.descriptor
    );
    this.descriptorUtil.decorate();
    let doOverride:Function = function():void {
      this.rootPath.__sandcatRootPathDescriptor = {};
    };
    expect(doOverride.bind(this)).to.throw(TypeError);
  }

  @Test({
    description: "should create a protected 'getRootPathDescriptor' method"
  })
  public decorateMethodTest():void {
    this.descriptorUtil = new RootPathDescriptorUtil(
      this.rootPath, this.descriptor
    );
    this.descriptorUtil.decorate();
    expect(this.rootPath.getRootPathDescriptor).to.not.be.undefined;
  }
  
  @Test({
    description: "should create an immutable method"
  })
  public decorateImmutableMethodTest():void {
    this.descriptorUtil = new RootPathDescriptorUtil(
      this.rootPath, this.descriptor
    );
    this.descriptorUtil.decorate();
    let doOverride:Function = function():void {
      this.rootPath.getRootPathDescriptor = function():void {};
    };
    expect(doOverride.bind(this)).to.throw(TypeError);
  }
}