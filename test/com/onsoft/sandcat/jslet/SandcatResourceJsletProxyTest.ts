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

import { TestSuite, Test, Before, After } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { SandcatResourceJsletProxy } from "../../../../../src/com/onsoft/sandcat/jslet/SandcatResourceJsletProxy";
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";
import { HttpMethod } from "jec-commons";
import { HttpRequest, HttpResponse } from "jec-exchange";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/SandcatResourceJsletProxyTestUtils";

@TestSuite({
  description: "Test the SandcatResourceJsletProxy class methods"
})
export class SandcatResourceJsletProxyTest {
  
  public proxy:SandcatResourceJsletProxy = null;
  public exitCallback:any = null;

  @Before()
  public initTest():void {
    this.proxy = new SandcatResourceJsletProxy();
    this.exitCallback = (req:HttpRequest, res:HttpResponse, data:any)=> {};
  }

  @After()
  public resetTest():void {
    this.proxy = null;
    this.exitCallback = null;
  }

  @Test({
    description: "should return null"
  })
  public getResourceTest():void {
    expect(this.proxy.getResource()).to.be.null;
  }
  
  @Test({
    description: "should set the specified resource object to the proxy"
  })
  public setResourceTest():void {
    let resource:any = utils.buildResource();
    this.proxy.setResource(resource);
    expect(this.proxy.getResource()).to.equal(resource);
  }
  
  @Test({
    description: "should return null"
  })
  public getUrlPatternsTest():void {
    expect(this.proxy.getUrlPatterns()).to.be.null;
  }
  
  @Test({
    description: "should return null"
  })
  public getNameTest():void {
    expect(this.proxy.getName()).to.be.null;
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.INIT"
  })
  public initMethodTest():void {
    let spy:any = chai.spy.on(this.proxy, "processJsletOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.init();
    expect(spy).to.have.been.called.with(JsletMethod.INIT);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.DESTROY"
  })
  public destroyMethodTest():void {
    let spy:any = chai.spy.on(this.proxy, "processJsletOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.destroy();
    expect(spy).to.have.been.called.with(JsletMethod.DESTROY);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.BEFORE"
  })
  public beforeMethodTest():void {
    let spy:any = chai.spy.on(this.proxy, "processJsletOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.before();
    expect(spy).to.have.been.called.with(JsletMethod.BEFORE);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.AFTER"
  })
  public afterMethodTest():void {
    let spy:any = chai.spy.on(this.proxy, "processJsletOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.after();
    expect(spy).to.have.been.called.with(JsletMethod.AFTER);
  }
  
  // TODO: for each method, we whould test operation invokation when they exist.

  @Test({
    description: "should invoke the internal operation process with HttpMethod.AFTER"
  })
  public doDeleteTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doDelete(
      utils.buildRequest(HttpMethod.DELETE),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.DELETE);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doDeleteExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doDelete(
      utils.buildRequest(HttpMethod.DELETE),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.GET"
  })
  public doGetTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doGet(
      utils.buildRequest(HttpMethod.GET),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.GET);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doGetExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doGet(
      utils.buildRequest(HttpMethod.GET),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.OPTIONS"
  })
  public doOptionsTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doOptions(
      utils.buildRequest(HttpMethod.OPTIONS),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.OPTIONS);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doOptionsExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doOptions(
      utils.buildRequest(HttpMethod.OPTIONS),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.TRACE"
  })
  public doTraceTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doTrace(
      utils.buildRequest(HttpMethod.TRACE),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.TRACE);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doTraceExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doTrace(
      utils.buildRequest(HttpMethod.TRACE),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.HEAD"
  })
  public doHeadTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doHead(
      utils.buildRequest(HttpMethod.HEAD),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.HEAD);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doHeadExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doHead(
      utils.buildRequest(HttpMethod.HEAD),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.CONNECT"
  })
  public doConnectTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doConnect(
      utils.buildRequest(HttpMethod.CONNECT),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.CONNECT);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doConnectExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doConnect(
      utils.buildRequest(HttpMethod.CONNECT),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.PUT"
  })
  public doPutTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPut(
      utils.buildRequest(HttpMethod.PUT),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.PUT);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doPutExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPut(
      utils.buildRequest(HttpMethod.PUT),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.POST"
  })
  public doPostTest():void {
    let spy:any = chai.spy.on(this.proxy, "processOperation");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPost(
      utils.buildRequest(HttpMethod.POST),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.with(HttpMethod.POST);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doPostExitTest():void {
    let spy:any = chai.spy.on(this, "exitCallback");
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPost(
      utils.buildRequest(HttpMethod.POST),
      utils.buildResponse(),
      this.exitCallback
    );
    expect(spy).to.have.been.called.once;
  }
}