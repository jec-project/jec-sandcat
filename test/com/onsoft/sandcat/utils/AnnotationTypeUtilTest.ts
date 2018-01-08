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
import { AnnotationTypeUtil } from "../../../../../src/com/onsoft/sandcat/utils/AnnotationTypeUtil";
import { AnnotationType } from "../../../../../src/com/onsoft/sandcat/reflect/AnnotationType";

@TestSuite({
  description: "Test the AnnotationTypeUtil class methods"
})
export class AnnotationTypeUtilTest {

  public util:AnnotationTypeUtil = null;

  @BeforeAll()
  public initTest():void {
    this.util = new AnnotationTypeUtil();
  }

  @Test({
    description: "should return 'AnnotationType.EXIT'"
  })
  public getParamStringRefEXIT():void {
    expect(
      this.util.getParamStringRef(AnnotationType.EXIT)
    ).to.equal("AnnotationType.EXIT");
  }

  @Test({
    description: "should return 'AnnotationType.PATH_PARAM'"
  })
  public getParamStringRefPATH_PARAM():void {
    expect(
      this.util.getParamStringRef(AnnotationType.PATH_PARAM)
    ).to.equal("AnnotationType.PATH_PARAM");
  }
  
  @Test({
    description: "should return 'AnnotationType.QUERY_PARAM'"
  })
  public getParamStringRefQUERY_PARAM():void {
    expect(
      this.util.getParamStringRef(AnnotationType.QUERY_PARAM)
    ).to.equal("AnnotationType.QUERY_PARAM");
  }

  @Test({
    description: "should return 'AnnotationType.HTTP_REQUEST'"
  })
  public getParamStringRefHTTP_REQUEST():void {
    expect(
      this.util.getParamStringRef(AnnotationType.HTTP_REQUEST)
    ).to.equal("AnnotationType.HTTP_REQUEST");
  }
  
  @Test({
    description: "should return 'AnnotationType.REQUEST_BODY'"
  })
  public getParamStringRefREQUEST_BODY():void {
    expect(
      this.util.getParamStringRef(AnnotationType.REQUEST_BODY)
    ).to.equal("AnnotationType.REQUEST_BODY");
  }
  
  @Test({
    description: "should return 'AnnotationType.COOKIE_PARAM'"
  })
  public getParamStringRefCOOKIE_PARAM():void {
    expect(
      this.util.getParamStringRef(AnnotationType.COOKIE_PARAM)
    ).to.equal("AnnotationType.COOKIE_PARAM");
  }
  
  @Test({
    description: "should return 'null'"
  })
  public getParamStringRefInvalid():void {
    expect(this.util.getParamStringRef(100)).to.be.null;
  }

  @Test({
    description: "should return 'AnnotationType.GET'"
  })
  public getMethodStringRefGET():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.GET)
    ).to.equal("AnnotationType.GET");
  }
  
  @Test({
    description: "should return 'AnnotationType.POST'"
  })
  public getMethodStringRefPOST():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.POST)
    ).to.equal("AnnotationType.POST");
  }
  
  @Test({
    description: "should return 'AnnotationType.PUT'"
  })
  public getMethodStringRefPUT():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.PUT)
    ).to.equal("AnnotationType.PUT");
  }
  
  @Test({
    description: "should return 'AnnotationType.DELETE'"
  })
  public getMethodStringRefDELETE():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.DELETE)
    ).to.equal("AnnotationType.DELETE");
  }
 
  @Test({
    description: "should return 'AnnotationType.CONNECT'"
  })
  public getMethodStringRefCONNECT():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.CONNECT)
    ).to.equal("AnnotationType.CONNECT");
  }

  @Test({
    description: "should return 'AnnotationType.HEAD'"
  })
  public getMethodStringRefHEAD():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.HEAD)
    ).to.equal("AnnotationType.HEAD");
  }

  @Test({
    description: "should return 'AnnotationType.OPTIONS'"
  })
  public getMethodStringRefOPTIONS():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.OPTIONS)
    ).to.equal("AnnotationType.OPTIONS");
  }
  
  @Test({
    description: "should return 'AnnotationType.TRACE'"
  })
  public getMethodStringRefTRACE():void {
    expect(
      this.util.getMethodStringRef(AnnotationType.TRACE)
    ).to.equal("AnnotationType.TRACE");
  }
 
  @Test({
    description: "should return 'null'"
  })
  public getMethodStringRefInvalid():void {
    expect(this.util.getMethodStringRef(100)).to.be.null;
  }
}