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

import {HttpRequest, HttpResponse, HttpJslet} from "jec-exchange";
import { ResourceDescriptor } from "../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";

/*!
 * This module constains utilities used by the SandcatResourceJsletProxyTest
 * test suite.
 */

// Utilities:
export class TestHttpJsletClass extends HttpJslet {}
export const UNDEFINED_KEY:string = "undefinedKey";
export const DEFINED_KEY:string = "definedKey";
export const DEFINED_KEY_VALUE:string = "definedKeyValue";
export const TEMPLATE_VALUE:string = "templateValue";
export const buildRequest:Function = function(method:string):HttpRequest {
  let request:any = (
    {
      getMethod: function():string { return method; },
      getOriginalUrl: function():string { return "original/url"; },
      getHeader: function():string { return "header"; }
    } 
  );
  return (request as HttpRequest);
};
export const buildResponse:Function = function():HttpResponse {
  let response:HttpResponse = (
    {
      status(statusCode:number):HttpResponse { return this; },
      sendStatus(statusCode:number):HttpResponse { return this; }
    } as HttpResponse
  );
  return response;
};
export const buildRestource:Function = function():any {
  let descriptor:ResourceDescriptor = new ResourceDescriptor();
  let resource:any = {
    getResourceDescriptor: function():ResourceDescriptor {
      return descriptor;
    }
  };
  return resource;
};
