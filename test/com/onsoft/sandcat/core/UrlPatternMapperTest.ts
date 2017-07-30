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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { UrlPatternMapper } from "../../../../../src/com/onsoft/sandcat/core/UrlPatternMapper";
import { UrlPatternMatcher } from "../../../../../src/com/onsoft/sandcat/core/UrlPatternMatcher";
import { RouteDescriptor } from "../../../../../src/com/onsoft/sandcat/reflect/RouteDescriptor";
import { RequestProperties } from "../../../../../src/com/onsoft/sandcat/utils/RequestProperties";
import { HttpMethod } from "jec-commons";

@TestSuite({
  description: "Test the UrlPatternMapper class properties",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class UrlPatternMapperTest {

  public mapper:UrlPatternMapper = null;
  public descriptor1:RouteDescriptor = null;
  public descriptor2:RouteDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.mapper = new UrlPatternMapper();
    this.descriptor1 = new RouteDescriptor(
      "/api/users/:id",
      "getUser",
      HttpMethod.GET
    );
    this.descriptor2 = new RouteDescriptor(
      "/api/search",
      "doSearch",
      HttpMethod.GET
    );
  }

  @Test({
    description: "should return 'false' when no HTTP method is registered",
    order: 1
  })
  public hasRegisteredMethodTest():void {
    expect(this.mapper.hasRegisteredMethod(HttpMethod.GET)).to.be.false;
  }

  @Test({
    description: "should register the specified descriptor",
    order: 2
  })
  public addRouteDescriptorTest():void {
    expect(this.mapper.addRouteDescriptor(this.descriptor1)).to.be.OK;
  }

  @Test({
    description: "should return 'true' when the specified HTTP method is registered",
    order: 3
  })
  public hasRegisteredMethodTrueTest():void {
    expect(this.mapper.hasRegisteredMethod(HttpMethod.GET)).to.be.true;
  }

  @Test({
    description: "should register the specified descriptor even if the HTTP method has already been registered",
    order: 4
  })
  public addRouteDescriptorSameMethodTest():void {
    expect(this.mapper.addRouteDescriptor(this.descriptor2)).to.be.OK;
  }

  @Test({
    description: "should return 'null' when no descriptor matches the specified URL properties",
    order: 5
  })
  public matchRequestFailTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/subroute";
    expect(this.mapper.matchRequest(props)).to.be.null;
  }

  @Test({
    description: "should return an instance of the UrlPatternMatcher class",
    order: 6
  })
  public matchRequestTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/api/search";
    props.httpMethod = HttpMethod.GET;
    expect(
      this.mapper.matchRequest(props)
    ).to.be.an.instanceOf(UrlPatternMatcher);
  }
  
  @Test({
    description: "should return the specified query parameters with the correct values",
    order: 7
  })
  public matchRequestQueryTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/api/search?name=foo&id=bar";
    props.httpMethod = HttpMethod.GET;
    let matcher:UrlPatternMatcher = this.mapper.matchRequest(props);
    expect(matcher.queryParams.name).to.equal("foo");
    expect(matcher.queryParams.id).to.equal("bar");
  }

  @Test({
    description: "should return the registered RouteDescriptor that matches with the specified request properties",
    order: 8
  })
  public matchDescriptorTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/api/users/30";
    props.httpMethod = HttpMethod.GET;
    let matcher:UrlPatternMatcher = this.mapper.matchRequest(props);
    expect(matcher.descriptor).to.be.equal(this.descriptor1);
  }
  
  @Test({
    description: "should return an object that contains the specified request properties values",
    order: 9
  })
  public matchPropertiesTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/api/users/30";
    props.httpMethod = HttpMethod.GET;
    let matcher:UrlPatternMatcher = this.mapper.matchRequest(props);
    expect(matcher.properties.id).to.be.equal("30");
  }
  
  @Test({
    description: "should return null when the sub-route of the specified request is not valid",
    order: 10
  })
  public matchKoTest():void {
    let props:RequestProperties = new RequestProperties();
    props.subRoute = "/api/users/30/data";
    props.httpMethod = HttpMethod.GET;
    expect(this.mapper.matchRequest(props)).to.be.null;
  }
}