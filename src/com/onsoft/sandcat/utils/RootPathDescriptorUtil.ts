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

import {RootPathDescriptor} from "../reflect/RootPathDescriptor";

/**
 * A helper class that decorates a jslet by adding 
 * <code>RootPathDescriptor</code> capabilities.
 */
export class RootPathDescriptorUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RootPathDescriptorUtil</code> instance.
   * 
   * @param {any} rootPath the root path object to decorate.
   * @param {RootPathDescriptor} descriptor the <code>RootPathDescriptor</code>
   *                                        associated with the specified
   *                                        root path object to decorate.
   */
  constructor(rootPath:any, descriptor:RootPathDescriptor) {
    this.initObj(rootPath, descriptor);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The root path object decorated by this utility class.
   */
  private _rootPath:any = null;

  /**
   * The <code>RootPathDescriptor</code> associated with the specified resource 
   * object to decorate.
   */
  private _descriptor:RootPathDescriptor = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {any} rootPath the root path object to decorate.
   * @param {RootPathDescriptor} descriptor the <code>RootPathDescriptor</code>
   *                                        associated with the specified
   *                                        root path object to decorate.
   */
  private initObj(rootPath:any, descriptor:RootPathDescriptor):void {
    this._rootPath = rootPath;
    this._descriptor = descriptor;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds <code>RootPathDescriptor</code> capabilities to the specified root
   * path object.
   */
  public decorate():void {
    let rootPath:any = this._rootPath; 
    Object.defineProperty(
      rootPath,
      "__sandcatRootPathDescriptor",
      {
        enumerable: false,
        configurable: false,
        value: this._descriptor
      }
    );
    Object.defineProperty(
      this._rootPath,
      "getRootPathDescriptor",
      {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function():RootPathDescriptor {
          return rootPath.__sandcatRootPathDescriptor;
        }
      }
    );
  }
};
