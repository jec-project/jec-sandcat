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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { AnnotationType } from "../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/AnnotationTypeTestUtils";

@TestSuite({
  description: "Test the AnnotationType enum values"
})
export class AnnotationTypeTest {

  @Test({
    description: "AnnotationType.EXIT should be equal to '0'"
  })
  public EXITTest():void {
    expect(AnnotationType.EXIT).to.equal(utils.EXIT);
  }

  @Test({
    description: "AnnotationType.PATH_PARAM should be equal to '1'"
  })
  public PATH_PARAMTest():void {
    expect(AnnotationType.PATH_PARAM).to.equal(utils.PATH_PARAM);
  }

  @Test({
    description: "AnnotationType.QUERY_PARAM should be equal to '2'"
  })
  public QUERY_PARAMTest():void {
    expect(AnnotationType.QUERY_PARAM).to.equal(utils.QUERY_PARAM);
  }
  
  @Test({
    description: "AnnotationType.HTTP_REQUEST should be equal to '3'"
  })
  public HTTP_REQUESTTest():void {
    expect(AnnotationType.HTTP_REQUEST).to.equal(utils.HTTP_REQUEST);
  }

  @Test({
    description: "AnnotationType.REQUEST_BODY should be equal to '4'"
  })
  public REQUEST_BODYTest():void {
    expect(AnnotationType.REQUEST_BODY).to.equal(utils.REQUEST_BODY);
  }

  @Test({
    description: "AnnotationType.COOKIE_PARAM should be equal to '5'"
  })
  public COOKIE_PARAMTest():void {
    expect(AnnotationType.COOKIE_PARAM).to.equal(utils.COOKIE_PARAM);
  }

  @Test({
    description: "AnnotationType.GET should be equal to '10'"
  })
  public GETTest():void {
    expect(AnnotationType.GET).to.equal(utils.GET);
  }
  
  @Test({
    description: "AnnotationType.POST should be equal to '11'"
  })
  public POSTTest():void {
    expect(AnnotationType.POST).to.equal(utils.POST);
  }

  @Test({
    description: "AnnotationType.PUT should be equal to '12'"
  })
  public PUTTest():void {
    expect(AnnotationType.PUT).to.equal(utils.PUT);
  }

  @Test({
    description: "AnnotationType.DELETE should be equal to '13'"
  })
  public DELETETest():void {
    expect(AnnotationType.DELETE).to.equal(utils.DELETE);
  }

  @Test({
    description: "AnnotationType.CONNECT should be equal to '14'"
  })
  public CONNECTTest():void {
    expect(AnnotationType.CONNECT).to.equal(utils.CONNECT);
  }
  
  @Test({
    description: "AnnotationType.HEAD should be equal to '15'"
  })
  public HEADTest():void {
    expect(AnnotationType.HEAD).to.equal(utils.HEAD);
  }

  @Test({
    description: "AnnotationType.OPTIONS should be equal to '16'"
  })
  public OPTIONSTest():void {
    expect(AnnotationType.OPTIONS).to.equal(utils.OPTIONS);
  }

  @Test({
    description: "AnnotationType.TRACE should be equal to '17'"
  })
  public TRACETest():void {
    expect(AnnotationType.TRACE).to.equal(utils.TRACE);
  }
}