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

import { TestSuite, Test, TestSorters, BeforeAll, AfterAll } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { DefaultSandcatContainer } from "../../../../../src/com/onsoft/sandcat/core/DefaultSandcatContainer";
import { RootPathDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";
import { SandcatLoggerProxy } from "../../../../../src/com/onsoft/sandcat/logging/SandcatLoggerProxy";
import { SandcatError } from "../../../../../src/com/onsoft/sandcat/exceptions/SandcatError";


// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/DefaultSandcatContainerTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the DefaultSandcatContainer class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class DefaultSandcatContainerTest {

  public container:DefaultSandcatContainer = null;

  @BeforeAll()
  public initTest():void {
    this.container = new DefaultSandcatContainer();
  }

  @AfterAll()
  public resetTest():void {
    this.container = null;
  }

  @Test({
    description: "should invoke the callback method with a SandcatError exception if no domain container has been set",
    order: 0
  })
  public processErrorTest():void {
    this.container.process((err:SandcatError)=> {
      expect(err).to.not.be.null;
    });
  }

  @Test({
    description: "should return 'null' when no domain container has been set",
    order: 1
  })
  public getDomainContainerDefaultTest():void {
    expect(this.container.getDomainContainer()).to.be.null;
  }
  
  @Test({
    description: "should add a DomainContainer object to this Sandcat container",
    order: 2
  })
  public setDomainContainerDefaultTest():void {
    this.container.setDomainContainer(utils.CONTAINER);
    expect(
      this.container.getDomainContainer()
    ).to.equal(utils.CONTAINER);
  }
  
  @Test({
    description: "should add a Logger object to the Sandcat logger proxy",
    order: 3
  })
  public setLoggerTest():void {
    let loggerSpy:any =
                     chai.spy.on(SandcatLoggerProxy.getInstance(), "setLogger");
    this.container.setDomainContainer(utils.CONTAINER);
    expect(loggerSpy).to.have.been.called.once;
  }
  
  @Test({
    description: "should return 'undefined' when no root path has been set",
    order: 4
  })
  public getRootPathDefaultTest():void {
    expect(this.container.getRootPath(utils.ROOT_PATH_REF)).to.be.undefined;
  }

  @Test({
    description: "should add a RootPathDescriptor object to this Sandcat container",
    order: 5
  })
  public addRootPathTest():void {
    this.container.addRootPath(utils.ROOT_PATH);
    expect(
      this.container.getRootPath(utils.ROOT_PATH_REF)
    ).to.equal(utils.ROOT_PATH);
  }

  @Test({
    description: "should return an instance of the RootPathDescriptor class",
    order: 6
  })
  public getRootPathTest():void {
    expect(
      this.container.getRootPath(utils.ROOT_PATH_REF)
    ).to.be.an.instanceOf(RootPathDescriptor);
  }

  @Test({
    description: "should invoke the callback method without SandcatError exception",
    order: 7
  })
  public processTest():void {
    this.container.process((err:SandcatError)=> {
      expect(err).to.be.null;
    });
  }

  @Test({
    description: "should invoke the callback and send a start a message to the logger",
    order: 8
  })
  public processStartMessageTest():void {
    let loggerSpy:any =
                     chai.spy.on(SandcatLoggerProxy.getInstance(), "log");
    this.container.process((err:SandcatError)=> {
      expect(loggerSpy).to.have.been.called.with(utils.START_MESSAGE);
    });
  }
  
  @Test({
    description: "should invoke the callback and send a ned a message to the logger",
    order: 9
  })
  public processEndMessageTest():void {
    let loggerSpy:any =
                     chai.spy.on(SandcatLoggerProxy.getInstance(), "log");
    this.container.process((err:SandcatError)=> {
      expect(loggerSpy).to.have.been.called.with(utils.END_MESSAGE);
    });
  }

}