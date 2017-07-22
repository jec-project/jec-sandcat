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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { RequestPropertiesBuilder } from "../../../../../src/com/onsoft/sandcat/builders/RequestPropertiesBuilder";
import { RequestProperties } from "../../../../../src/com/onsoft/sandcat/utils/RequestProperties";
import { HttpRequest } from "jec-exchange";
import { HttpMethod, HttpHeader } from "jec-commons";

@TestSuite({
  description: "Test the RequestPropertiesBuilder class properties"
})
export class RequestPropertiesBuilderTest {

  public builder:RequestPropertiesBuilder = null;
  public request:HttpRequest = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new RequestPropertiesBuilder();
    this.request = ( {
      getOriginalUrl: function():string { return "original/url"; },
      getHeader: function(type:string):string {
        let result:string = null;
        if(type === HttpHeader.ACCEPT) result = "accept";
        else if(type === HttpHeader.CONTENT_TYPE) result = "contentType";
        return result; 
      }
    } as any);
  }
  
  @Test({
    description: "should return an instance of the RequestProperties class"
  })
  public buildTest():void {
    expect(
      this.builder.build(HttpMethod.DELETE, this.request)
    ).to.be.an.instanceOf(RequestProperties);
  }
  
  @Test({
    description: "should return a RequestProperties instance with the correct 'httpMethod' property value"
  })
  public httpMethodTest():void {
    let props:RequestProperties = 
                           this.builder.build(HttpMethod.DELETE, this.request);
    expect(props.httpMethod).to.equal(HttpMethod.DELETE);
  }
  
  @Test({
    description: "should return a RequestProperties instance with the correct 'subRoute' property value"
  })
  public subRouteTest():void {
    let props:RequestProperties =
                           this.builder.build(HttpMethod.DELETE, this.request);
    expect(props.subRoute).to.equal(this.request.getOriginalUrl());
  }
  
  @Test({
    description: "should return a RequestProperties instance with the correct 'acccept' property value"
  })
  public accceptTest():void {
    let props:RequestProperties =
                           this.builder.build(HttpMethod.DELETE, this.request);
    expect(props.acccept).to.equal(this.request.getHeader(HttpHeader.ACCEPT));
  }
  
  @Test({
    description: "should return a RequestProperties instance with the correct 'contentType' property value"
  })
  public contentTypeTest():void {
    let props:RequestProperties =
                           this.builder.build(HttpMethod.DELETE, this.request);
    expect(
      props.contentType
    ).to.equal(this.request.getHeader(HttpHeader.CONTENT_TYPE));
  }
}