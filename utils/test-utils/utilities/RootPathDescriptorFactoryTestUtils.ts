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

import { FileProperties } from "jec-commons";
import { FilePropertiesBuilder } from "jec-commons-node";

/*!
 * This module constains utilities used by the RootPathDescriptorFactoryTest 
 * test suite.
 */

// Utilities:
const FILE_PATH:string = process.cwd() + "/utils/test-utils/classes/RootPathTestClass.js";
const FILE_NAME:string = "RootPathTestClass.js";
const buildFile:Function = function():FileProperties {
  const builder:FilePropertiesBuilder = new FilePropertiesBuilder();
  const properties:FileProperties = builder.build(FILE_NAME, FILE_PATH, null);
  return properties;
};
export const FILE:FileProperties = buildFile();
export const PATH:string = "/versioned.api";
export const FULLPATH:string = "/versioned.api/v1.0";
export const REF:string = "v1.0";
export const VERSION:any = { prefix: 'v', major: 1, minor: 0 };
