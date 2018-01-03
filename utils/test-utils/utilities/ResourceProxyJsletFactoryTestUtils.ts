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

import { FileProperties, ConsoleLogger, Logger, DelegatedContainer } from "jec-commons";
import { FilePropertiesBuilder } from "jec-commons-node";
import { Jslet, JsletContext } from "jec-exchange";
import { Sandcat } from "../../../src/com/onsoft/sandcat/Sandcat";
import { SandcatBuilder } from "../../../src/com/onsoft/sandcat/builders/SandcatBuilder";
import { DomainContainer } from "jec-glasscat-core";

/*!
 * This module constains utilities used by the ResourceProxyJsletFactoryTest 
 * test suite.
 */

// Utilities:
const LOGGER:Logger = new ConsoleLogger();
const JSLET_CTX:any = {
  addJslet: function(jslet:Jslet) {}
};
const CONTAINER:any = {
  getLogger: function():Logger {
    return LOGGER;
  },
  getJsletContext: function():JsletContext {
    return (JSLET_CTX as JsletContext);
  }
};
const buildSandcat:Function = function ():Sandcat {
  let builder:SandcatBuilder = new SandcatBuilder();
  let result:DelegatedContainer = builder.build((CONTAINER  as DomainContainer));
  return (result as Sandcat);
};
const FILE_PATH:string = process.cwd() + "/utils/test-utils/classes/ResourceTestClass.js";
const FILE_NAME:string = "ResourceTestClass.js";
const buildFile:Function = function():FileProperties {
  let builder:FilePropertiesBuilder = new FilePropertiesBuilder();
  let properties:FileProperties = builder.build(FILE_NAME, FILE_PATH, null);
  return properties;
};
export const FILE:FileProperties = buildFile();
export const CONTEXT_ROOT:string = "contextRoot";
export const SANDCAT:Sandcat = buildSandcat();
