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

import { TestSuite, Test, AfterAll, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { ResourceProxyJsletFactory } from "../../../../../src/com/onsoft/sandcat/core/ResourceProxyJsletFactory";
import { SandcatResourceJsletProxy } from "../../../../../src/com/onsoft/sandcat/jslet/SandcatResourceJsletProxy";
import { JarsContextManager } from "../../../../../src/com/onsoft/sandcat/jcad/JarsContextManager";
import { ResourceJsletProxy } from "../../../../../src/com/onsoft/sandcat/jslet/ResourceJsletProxy";
import { RootPathVersion } from "jec-jars";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/ResourceProxyJsletFactoryTestUtils";

@TestSuite({
  description: "Test the ResourceProxyJsletFactory class methods"
})
export class ResourceProxyJsletFactoryTest {

  public factory:ResourceProxyJsletFactory = null;
  public contextManager:JarsContextManager = null;
  public proxy:ResourceJsletProxy = null;

  @BeforeAll()
  public initTest():void {
    this.contextManager = new JarsContextManager();
    this.contextManager.createContext();
    this.factory = new ResourceProxyJsletFactory();
  }

  @AfterAll()
  public resetTest():void {
    this.factory = null;
    this.contextManager.deleteContext();
    this.contextManager = null;
  }

  @Test({
    description: "should return a new instance of the 'SandcatResourceJsletProxy' class",
  })
  public createTest():void {
    this.proxy = this.factory.create(
      utils.FILE,
      utils.CONTEXT_ROOT,
      utils.SANDCAT
    );
    expect(this.proxy).to.be.an.instanceOf(SandcatResourceJsletProxy);
  }
}