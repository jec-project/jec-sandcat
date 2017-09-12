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

import {AnnotatedMethodParams, TestParams, TestSuiteParams} from "jec-juta";
import {ResourceDescriptorRegistry} from "../../../src/com/onsoft/sandcat/metadata/ResourceDescriptorRegistry";
import {ResourceDescriptor} from "../../../src/com/onsoft/sandcat/reflect/ResourceDescriptor";
import {HttpMethodParams} from "jec-jars";

/*!
 * This module constains utilities used by the JCAD decorators test suite.
 */

// Utilities:
export const ROUTE:string = "/route";
export const CONSUMES:string = "application/json";
export const PRODUCES:string = "application/json";
export const CROSS_DOMAIN_POLICY:string = "*";
const buildHttpMethodParams:Function = function():HttpMethodParams {
  let params:HttpMethodParams = ({
    route: ROUTE,
    consumes: CONSUMES,
    produces: PRODUCES,
    crossDomainPolicy: CROSS_DOMAIN_POLICY
  } as HttpMethodParams);
  return params;
};
export const initRegistry:Function = function():void {
  let descriptor:ResourceDescriptor = new ResourceDescriptor();
  ResourceDescriptorRegistry.registerDescriptor(descriptor);
};
export const resetRegistry:Function = function():void {
  ResourceDescriptorRegistry.registerDescriptor(null);
};
export const DESCRIPTOR:PropertyDescriptor = {
  value: function(foo:string, bar:number):void {}
};
export const KEY:string = "memberToTest";
export const TARGET:any = {};
export const PARAMETER_INDEX:number = 0;
export const PARAMS:HttpMethodParams = buildHttpMethodParams();
export const PARAM_NAME_1:string = "foo";
export const PARAM_NAME_2:string = "bar";
export const RESOURCE_PATH:string = "/resource/path";
