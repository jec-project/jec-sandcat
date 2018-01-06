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

import {MethodDescriptor} from "../../../src/com/onsoft/sandcat/reflect/MethodDescriptor";
import {ParameterDescriptor} from "../../../src/com/onsoft/sandcat/reflect/ParameterDescriptor";
import {HttpRequest} from "jec-exchange";
import {UrlPatternMatcher} from "../../../src/com/onsoft/sandcat/core/UrlPatternMatcher";

/*!
 * This module constains utilities used by the ParameterInjectorTest test suite.
 */

// Utilities:
export const MATCHER:UrlPatternMatcher = new UrlPatternMatcher();
export const PROPERTY_VALUE:string = "propertyValue";
MATCHER.properties = {
  parameterName: PROPERTY_VALUE
};
export const QUERY_PARAM_VALUE:string = "queryParamValue";
MATCHER.queryParams = {
  parameterName: QUERY_PARAM_VALUE
};
export const CALLBACK_HANDLER:Function = function():void {};
export const METHOD_DESCRIPTOR:MethodDescriptor = new MethodDescriptor();
export const BODY:string = "body";
export const COOKIE_VALUE:string = "cookieValue";
export const COOKIES:any = {
  parameterName: COOKIE_VALUE
};
export const REQUEST:HttpRequest = ({
  getBody: function():string {
    return BODY;
  },
  getCookies: function():any {
    return COOKIES;
  }
} as HttpRequest);
export const PARAMETER_NAME:string = "parameterName";
export const buildParameterDescriptor:Function = function(annotationType:number):ParameterDescriptor {
  let desc:ParameterDescriptor = new ParameterDescriptor();
  desc.annotationType = annotationType;
  desc.methodName = "methodName";
  desc.key = PARAMETER_NAME;
  desc.index = 0;
  return desc;
};

