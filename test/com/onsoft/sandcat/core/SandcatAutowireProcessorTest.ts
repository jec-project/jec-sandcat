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

import { TestSuite, Test, BeforeAll, TestSorters, AfterAll } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { SandcatAutowireProcessor } from "../../../../../src/com/onsoft/sandcat/core/SandcatAutowireProcessor";
import { SandcatLoggerProxy } from "../../../../../src/com/onsoft/sandcat/logging/SandcatLoggerProxy";
import { Sandcat } from "../../../../../src/com/onsoft/sandcat/Sandcat";
import { JarsConnectorRefs } from "jec-jars";
import { JcadContextError } from "jec-commons";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/SandcatAutowireProcessorTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the SandcatAutowireProcessor class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class SandcatAutowireProcessorTest {

  public processor:SandcatAutowireProcessor = null;
  public sandcat:Sandcat = null;

  @BeforeAll()
  public initTest():void {
    this.processor = new SandcatAutowireProcessor();
    this.sandcat = ({ } as Sandcat);
  }

  @Test({
    description: "should 'null' as default value",
    order: 0
  })
  public getSandcatContainerDefaultTest():void {
    expect(this.processor.getSandcatContainer()).to.be.null;
  }

  @Test({
    description: "should set the Sandcat container for this processor",
    order: 1
  })
  public setSandcatContainerTest():void {
    expect(this.processor.setSandcatContainer(this.sandcat)).to.be.OK;
  }

  @Test({
    description: "should return the same Sandcat container as set with the setSandcatContainer() method",
    order: 2
  })
  public getSandcatContainerTest():void {
    expect(this.processor.getSandcatContainer()).to.equal(this.sandcat);
  }

  @Test({
    description: "should have no effect",
    order: 3
  })
  public processStartTest():void {
    expect(this.processor.processStart(null, null)).to.be.OK;
  }

  @Test({
    description: "should find one resource class and log resource information",
    order: 4
  })
  public processTest():void {
    let loggerSpy:any = chai.spy.on(SandcatLoggerProxy.getInstance(), "log");
    this.processor.process(utils.FILE, utils.buildDomainConnector());
    expect(loggerSpy).to.have.been.called.with(
      "autowired resource detected: source file='" + utils.FILE.name + "'"
    );
  }

  @Test({
    description: "should throw a JCAD error when trying to create simultaneous instances of the SandcatAutowireProcessor class",
    order: 5
  })
  public multipleInstancesErrorTest():void {
    let newInstance:Function = function():SandcatAutowireProcessor {
      return new SandcatAutowireProcessor();
    };
    expect(newInstance).to.throw(JcadContextError);
  }

  @Test({
    description: "should finish the process with no error",
    order: 6
  })
  public processCompleteTest():void {
    expect(
      this.processor.processComplete(utils.buildDomainConnector(), null)
    ).to.be.OK;
  }
}