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
import { expect } from "chai";
import * as sinon from "sinon";
import { SandcatResourceJsletProxy } from "../../../../../src/com/onsoft/sandcat/jslet/SandcatResourceJsletProxy";
import { JsletMethod } from "../../../../../src/com/onsoft/sandcat/reflect/JsletMethod";
import { HttpMethod } from "jec-commons";
import { HttpRequest, HttpResponse } from "jec-exchange";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/SandcatResourceJsletProxyTestUtils";

@TestSuite({
  description: "Test the SandcatResourceJsletProxy class methods"
})
export class SandcatResourceJsletProxyTest {
  
  public proxy:SandcatResourceJsletProxy = null;
  public exitCallback:any = null;
  public processJsletOperationSpy:any = null;
  public processOperationSpy:any = null;
  public exitCallbackSpy:any = null;

  @Before()
  public initTest():void {
    this.proxy = new SandcatResourceJsletProxy();
    this.exitCallback = (req:HttpRequest, res:HttpResponse, data:any)=> {};
    this.processJsletOperationSpy =
                                 sinon.spy(this.proxy, "processJsletOperation");
    this.processOperationSpy = sinon.spy(this.proxy, "processOperation");
    this.exitCallbackSpy = sinon.spy(this, "exitCallback");
  }

  @After()
  public resetTest():void {
    this.proxy = null;
    this.exitCallback = null;
    sinon.restore();
    this.processJsletOperationSpy = null;
    this.processOperationSpy = null;
    this.exitCallbackSpy = null;
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
    const resource:any = utils.buildResource();
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
    this.proxy.setResource(utils.buildResource());
    this.proxy.init();
    sinon.assert.calledWith(this.processJsletOperationSpy, JsletMethod.INIT);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.DESTROY"
  })
  public destroyMethodTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.destroy();
    sinon.assert.calledWith(this.processJsletOperationSpy, JsletMethod.DESTROY);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.BEFORE"
  })
  public beforeMethodTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.before();
    sinon.assert.calledWith(this.processJsletOperationSpy, JsletMethod.BEFORE);
  }
  
  @Test({
    description: "should invoke the internal operation process with JsletMethod.AFTER"
  })
  public afterMethodTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.after();
    sinon.assert.calledWith(this.processJsletOperationSpy, JsletMethod.AFTER);
  }
  
  // TODO: for each method, we whould test operation invokation when they exist.

  @Test({
    description: "should invoke the internal operation process with HttpMethod.AFTER"
  })
  public doDeleteTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doDelete(
      utils.buildRequest(HttpMethod.DELETE),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.DELETE);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doDeleteExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doDelete(
      utils.buildRequest(HttpMethod.DELETE),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.GET"
  })
  public doGetTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doGet(
      utils.buildRequest(HttpMethod.GET),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.GET);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doGetExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doGet(
      utils.buildRequest(HttpMethod.GET),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.OPTIONS"
  })
  public doOptionsTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doOptions(
      utils.buildRequest(HttpMethod.OPTIONS),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.OPTIONS);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doOptionsExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doOptions(
      utils.buildRequest(HttpMethod.OPTIONS),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.TRACE"
  })
  public doTraceTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doTrace(
      utils.buildRequest(HttpMethod.TRACE),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.TRACE);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doTraceExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doTrace(
      utils.buildRequest(HttpMethod.TRACE),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.HEAD"
  })
  public doHeadTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doHead(
      utils.buildRequest(HttpMethod.HEAD),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.HEAD);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doHeadExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doHead(
      utils.buildRequest(HttpMethod.HEAD),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.CONNECT"
  })
  public doConnectTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doConnect(
      utils.buildRequest(HttpMethod.CONNECT),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.CONNECT);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doConnectExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doConnect(
      utils.buildRequest(HttpMethod.CONNECT),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.PUT"
  })
  public doPutTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPut(
      utils.buildRequest(HttpMethod.PUT),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.PUT);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doPutExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPut(
      utils.buildRequest(HttpMethod.PUT),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
  
  @Test({
    description: "should invoke the internal operation process with HttpMethod.POST"
  })
  public doPostTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPost(
      utils.buildRequest(HttpMethod.POST),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledWith(this.processOperationSpy, HttpMethod.POST);
  }
  
  @Test({
    description: "should invoke the exit method passed as parameter"
  })
  public doPostExitTest():void {
    this.proxy.setResource(utils.buildResource());
    this.proxy.doPost(
      utils.buildRequest(HttpMethod.POST),
      utils.buildResponse(),
      this.exitCallback
    );
    sinon.assert.calledOnce(this.exitCallbackSpy);
  }
}