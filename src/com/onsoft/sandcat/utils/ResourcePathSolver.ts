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

import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {UrlStringsEnum} from "jec-commons";

/**
 * A helper class that provides methods for solving parameters passed to the
 * <code>@ResourcePath</code> annotation.
 */
export class ResourcePathSolver {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ResourcePathSolver</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves the specified <code>path</code> and sets the corresponding 
   * <code>resourcePath</code> and <code>urlPattern</code> properties for the 
   * associated <code>ResourceDescriptor</code> instance.
   * 
   * @param {string} path the root URL path to resolve.
   * @param {ResourceDescriptor} descriptor the <code>ResourceDescriptor</code> 
   *                                        for which to resolve the path
   *                                        parameter.
   */
  public resolvePath(path:string, descriptor:ResourceDescriptor):void {
    const fixedPath:string = path.indexOf(UrlStringsEnum.SLASH) === 0 ?
                             path : UrlStringsEnum.SLASH + path;
    descriptor.resourcePath = fixedPath;
  }
};
