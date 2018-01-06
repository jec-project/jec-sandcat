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

import { TestSuite, Test, BeforeAll, TestSorters, AfterAll } from "jec-juta";
import { expect } from "chai";
import { SandcatAutowireProcessor } from "../../../../../src/com/onsoft/sandcat/core/SandcatAutowireProcessor";
import { JarsConnectorRefs } from "jec-jars";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/SandcatAutowireProcessorTestUtils";

@TestSuite({
  description: "Test the SandcatAutowireProcessor context internal managment",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class SandcatAutowireProcessorContextTest {

  public processor:SandcatAutowireProcessor = null;
  public processCompleteHandler:Function = null;

  @BeforeAll()
  public initTest():void {
    this.processCompleteHandler = function():void {};
  }

  @AfterAll()
  public resetTest():void {
    this.processor = null;
  }

  @Test({
    description: "should create a new SandcatAutowireProcessor instance an create all JCAD contexts for the JARS specification",
    order: 0
  })
  public initProcessorTest():void {
    let buildProcessor:Function = function():void {
      this.processor = new SandcatAutowireProcessor();
      this.processor.processCompleteHandler = this.processCompleteHandler;
    };
    expect(buildProcessor.bind(this)()).to.be.OK;
  }

  @Test({
    description: "should create the JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF context reference",
    order: 1
  })
  public COOKIE_PARAM_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.CONNECT_CONNECTOR_REF context reference",
    order: 2
  })
  public CONNECT_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.CONNECT_CONNECTOR_REF
      )
    ).to.be.true;
  }
  
  @Test({
    description: "should create the JarsConnectorRefs.DELETE_CONNECTOR_REF context reference",
    order: 3
  })
  public DELETE_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.DELETE_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.DESTROY_CONNECTOR_REF context reference",
    order: 4
  })
  public DESTROY_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.DESTROY_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.EXIT_CONNECTOR_REF context reference",
    order: 5
  })
  public EXIT_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.EXIT_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.GET_CONNECTOR_REF context reference",
    order: 6
  })
  public GET_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.GET_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.HEAD_CONNECTOR_REF context reference",
    order: 7
  })
  public HEAD_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.HEAD_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.INIT_CONNECTOR_REF context reference",
    order: 8
  })
  public INIT_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.INIT_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.OPTIONS_CONNECTOR_REF context reference",
    order: 9
  })
  public OPTIONS_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.OPTIONS_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF context reference",
    order: 10
  })
  public PATH_PARAM_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF
      )
    ).to.be.true;
  }
  
  @Test({
    description: "should create the JarsConnectorRefs.POST_CONNECTOR_REF context reference",
    order: 11
  })
  public POST_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.POST_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.PUT_CONNECTOR_REF context reference",
    order: 12
  })
  public PUT_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.PUT_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF context reference",
    order: 13
  })
  public QUERY_PARAM_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF context reference",
    order: 14
  })
  public REQUEST_BODY_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF context reference",
    order: 15
  })
  public REQUEST_PARAM_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF context reference",
    order: 16
  })
  public RESOURCE_PATH_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF context reference",
    order: 17
  })
  public ROOT_PATH_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF context reference",
    order: 18
  })
  public ROOT_PATH_REFS_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should create the JarsConnectorRefs.TRACE_CONNECTOR_REF context reference",
    order: 19
  })
  public TRACE_CONNECTOR_REFTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.TRACE_CONNECTOR_REF
      )
    ).to.be.true;
  }

  @Test({
    description: "should remove all the registered JCAD contexts associated with the Tiger Framework",
    order: 20
  })
  public processCompleteTest():void {
    expect(
      this.processor.processComplete(utils.buildDomainConnector(), null)
    ).to.be.OK;
  }

  @Test({
    description: "should create the JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF context reference",
    order:  21
  })
  public COOKIE_PARAM_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.CONNECT_CONNECTOR_REF context reference",
    order:  22
  })
  public CONNECT_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.CONNECT_CONNECTOR_REF
      )
    ).to.be.false;
  }
  
  @Test({
    description: "should create the JarsConnectorRefs.DELETE_CONNECTOR_REF context reference",
    order:  23
  })
  public DELETE_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.DELETE_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.DESTROY_CONNECTOR_REF context reference",
    order:  24
  })
  public DESTROY_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.DESTROY_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.EXIT_CONNECTOR_REF context reference",
    order:  25
  })
  public EXIT_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.EXIT_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.GET_CONNECTOR_REF context reference",
    order:  26
  })
  public GET_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.GET_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.HEAD_CONNECTOR_REF context reference",
    order:  27
  })
  public HEAD_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.HEAD_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.INIT_CONNECTOR_REF context reference",
    order:  28
  })
  public INIT_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.INIT_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.OPTIONS_CONNECTOR_REF context reference",
    order:  29
  })
  public OPTIONS_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.OPTIONS_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF context reference",
    order:  30
  })
  public PATH_PARAM_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF
      )
    ).to.be.false;
  }
  
  @Test({
    description: "should create the JarsConnectorRefs.POST_CONNECTOR_REF context reference",
    order:  31
  })
  public POST_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.POST_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.PUT_CONNECTOR_REF context reference",
    order:  32
  })
  public PUT_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.PUT_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF context reference",
    order:  33
  })
  public QUERY_PARAM_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF context reference",
    order:  34
  })
  public REQUEST_BODY_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF context reference",
    order:  35
  })
  public REQUEST_PARAM_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF context reference",
    order:  36
  })
  public RESOURCE_PATH_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF context reference",
    order:  37
  })
  public ROOT_PATH_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF context reference",
    order:  38
  })
  public ROOT_PATH_REFS_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF
      )
    ).to.be.false;
  }

  @Test({
    description: "should create the JarsConnectorRefs.TRACE_CONNECTOR_REF context reference",
    order:  39
  })
  public TRACE_CONNECTOR_REF_FalseTest():void {
    expect(
      utils.CONTEXT_MANAGER.hasContext(
        JarsConnectorRefs.TRACE_CONNECTOR_REF
      )
    ).to.be.false;
  }
}