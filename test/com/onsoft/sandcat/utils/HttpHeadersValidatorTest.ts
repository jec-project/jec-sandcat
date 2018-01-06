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
import { HttpHeadersValidator } from "../../../../../src/com/onsoft/sandcat/utils/HttpHeadersValidator";
import { MethodDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import { RequestProperties } from "../../../../../src/com/onsoft/sandcat/utils/RequestProperties";
import { HttpStatusCode } from "jec-commons";

@TestSuite({
  description: "Test the HttpHeadersValidator class methods"
})
export class HttpHeadersValidatorTest {

  public validator:HttpHeadersValidator = null;

  @BeforeAll()
  public initTest():void {
    this.validator = new HttpHeadersValidator();
  }

  @Test({
    description: "should return HttpStatusCode.OK"
  })
  public validateDefaultTest():void {
    let desc:MethodDescriptor = new MethodDescriptor();
    let props:RequestProperties = new RequestProperties();
    expect(this.validator.validate(desc, props)).to.equal(HttpStatusCode.OK);
  }

  @Test({
    description: "should return HttpStatusCode.OK"
  })
  public validateTest():void {
    let desc:MethodDescriptor = new MethodDescriptor();
    let props:RequestProperties = new RequestProperties();
    desc.consumes = "application/json";
    props.contentType = "application/json";
    expect(this.validator.validate(desc, props)).to.equal(HttpStatusCode.OK);
  }

  @Test({
    description: "should return HttpStatusCode.UNSUPPORTED_MEDIA_TYPE"
  })
  public invalidMediaTest():void {
    let desc:MethodDescriptor = new MethodDescriptor();
    let props:RequestProperties = new RequestProperties();
    desc.consumes = "application/json";
    props.contentType = "application/xml";
    expect(
      this.validator.validate(desc, props)
    ).to.equal(HttpStatusCode.UNSUPPORTED_MEDIA_TYPE);
  }

  @Test({
    description: "should return HttpStatusCode.OK"
  })
  public validateAllMimeTypeTest():void {
    let desc:MethodDescriptor = new MethodDescriptor();
    let props:RequestProperties = new RequestProperties();
    props.contentType ="*/*";
    expect(this.validator.validate(desc, props)).to.equal(HttpStatusCode.OK);
  }

  @Test({
    description: "should return HttpStatusCode.NOT_ACCEPTABLE"
  })
  public methodDescTest():void {
    let desc:MethodDescriptor = new MethodDescriptor();
    let props:RequestProperties = new RequestProperties();
    props.contentType = "application/xml";
    expect(
      this.validator.validate(desc, props)
    ).to.equal(HttpStatusCode.NOT_ACCEPTABLE);
  }
}