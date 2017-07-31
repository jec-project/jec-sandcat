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

import { RootPathDescriptor } from "../../../src/com/onsoft/sandcat/reflect/RootPathDescriptor";
import { Jslet } from "jec-exchange";
import { ConsoleLogger, Logger, SourceFileInspector, FilePreProcessor } from "jec-commons";

/*!
 * This module constains utilities used by the DefaultSandcatContainerTest test
 * suite.
 */

// Utilities:
export const ROOT_PATH_REF:string = "rootPathRef";
const buildRootPath:Function = function():RootPathDescriptor {
  let rootPath:RootPathDescriptor = new RootPathDescriptor();
  rootPath.ref = ROOT_PATH_REF;
  return rootPath;
};
export const ROOT_PATH:RootPathDescriptor = buildRootPath();
const LOGGER:Logger = new ConsoleLogger();
const INSPECTOR:any = {
  addProcessor: function(processor:FilePreProcessor) {
    (processor as any)._contextManager.deleteContext();
  }
};
export const CONTAINER:any = {
  getLogger: function():Logger {
    return LOGGER;
  },
  getSourceFileInspector: function():SourceFileInspector {
    return (INSPECTOR as SourceFileInspector);
  }
};
export const START_MESSAGE:string = "Sandcat process start";
export const END_MESSAGE:string = "Sandcat process complete";
