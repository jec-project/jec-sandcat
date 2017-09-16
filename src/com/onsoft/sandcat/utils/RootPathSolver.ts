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

import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {UrlStringsEnum} from "jec-commons";
import {RoutePathParams, RootPathVersion} from "jec-jars";

/**
 * A helper class that provides methods for solving parameters passed to the
 * <code>@RootPath</code> annotation.
 */
export class RootPathSolver {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RootPathSolver</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves the specified <code>RootPathVersion</code> instance to a URI
   * segment.
   * 
   * @param {RootPathVersion} version the <code>RootPathVersion</code> instance  
   *                                  to resolve as a URI segment.
   * @return {string} the URI segment resolved from the specified
   *                  <code>RootPathVersion</code> instance.
   */
  private buildVersionPath(version:RootPathVersion):string {
    let versionPath:string = UrlStringsEnum.EMPTY_STRING;
    let prop:string = null;
    if(version) {
      prop = version.prefix;
      if(prop) versionPath += prop;
      prop = String(version.major);
      if(prop) {
        versionPath += prop;
        prop = String(version.minor);
        if(prop) versionPath += UrlStringsEnum.DOT + prop;
      }
    }
    return versionPath;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves the paths specified in the <code>params</code> object and sets the
   * corresponding <code>resourcePath</code> and <code>urlPattern</code> 
   * properties for the associated <code>RootPathDescriptor</code> instance.
   * 
   * @param {RoutePathParams} params the parameter object that containes URL
   *                                 paths to resolve.
   * @param {RootPathDescriptor} descriptor the <code>RootPathDescriptor</code> 
   *                                        for which to resolve the path
   *                                        parameter.
   */
  public resolvePath(params:RoutePathParams,
                                           descriptor:RootPathDescriptor):void {
    let path:string = descriptor.path;
    let fixedPath:string = path.indexOf(UrlStringsEnum.SLASH) === 0 ?
                           path : UrlStringsEnum.SLASH + path;
    descriptor.fullPath = fixedPath;
    let versionPath:string = this.buildVersionPath(params.version);
    descriptor.fullPath += UrlStringsEnum.SLASH + versionPath;
  }
};
