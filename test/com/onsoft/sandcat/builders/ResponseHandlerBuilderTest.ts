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
import { ResponseHandlerBuilder } from "../../../../../src/com/onsoft/sandcat/builders/ResponseHandlerBuilder";
import { HttpRequest, HttpResponse } from "jec-exchange";

@TestSuite({
  description: "Test the ResponseHandlerBuilder class properties"
})
export class ResponseHandlerBuilderTest {
  
  @Test({
    description: "should return a function"
  })
  public buildTest():void {
    const builder = new ResponseHandlerBuilder();
    const exit:any =
               function(req: HttpRequest, res: HttpResponse, data: any):void {};
    expect(
      builder.build(( {} as HttpRequest ), ( {} as HttpResponse ), exit)
    ).to.be.a("function");
  }
}