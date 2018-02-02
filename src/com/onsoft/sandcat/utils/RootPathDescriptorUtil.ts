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
import {SingletonErrorFactory} from "./SingletonErrorFactory";

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
   */
  constructor() {
    if(RootPathDescriptorUtil._locked || RootPathDescriptorUtil.INSTANCE) {
      new SingletonErrorFactory().throw(RootPathDescriptorUtil);
    }
    RootPathDescriptorUtil._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>RootPathDescriptorUtil</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>RootPathDescriptorUtil</code> singleton instance reference.
   */
  private static INSTANCE:RootPathDescriptorUtil = null;

  /**
   * Returns a reference to the <code>RootPathDescriptorUtil</code>
   * singleton.
   *
   * @return {RootPathDescriptorUtil} a reference to the
   *                              <code>RootPathDescriptorUtil</code> singleton.
   */
  public static getInstance():RootPathDescriptorUtil {
    if(RootPathDescriptorUtil.INSTANCE === null) {
      RootPathDescriptorUtil._locked = false;
      RootPathDescriptorUtil.INSTANCE = new RootPathDescriptorUtil();
    }
    return RootPathDescriptorUtil.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds <code>RootPathDescriptor</code> capabilities to the specified root
   * path object.
   * 
   * @param {any} rootPath the root path object to decorate.
   * @param {RootPathDescriptor} descriptor the <code>RootPathDescriptor</code>
   *                                        associated with the specified
   *                                        root path object to decorate.
   */
  public decorate(rootPath:any, descriptor:RootPathDescriptor):void {
    Object.defineProperty(
      rootPath,
      "__sandcatRootPathDescriptor",
      {
        enumerable: false,
        configurable: false,
        value: descriptor
      }
    );
    Object.defineProperty(
      rootPath,
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
