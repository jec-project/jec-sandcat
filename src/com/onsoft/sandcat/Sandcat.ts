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

import {DomainContainer} from "jec-glasscat-core";
import {RootPathDescriptor} from "./reflect/RootPathDescriptor";
import {SandcatError} from "./exceptions/SandcatError";

/**
 * The main Sandcat execution entry point, which will execute a full Sandcat
 * execution session.
 */
export interface Sandcat {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the domain contained associated with this <code>Sandcat</code>
   * object.
   * 
   * @param {DomainContainer} container the domain associated with this
   *                                    <code>Sandcat</code> object.
   */
  setDomainContainer(container:DomainContainer):void;

  /**
   * Starts the Sandcat main process.
   * 
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes a
   *                            <code>SandcatError</code> object as parameter
   *                            which represents an error message if the
   *                            process failed.
   */
  process(callback:(err:SandcatError)=>void):void;

  /**
   * Adds a new root path to this <code>Sandcat</code> object.
   * 
   * @param {RootPathDescriptor} rootPath the root path to add to this
   *                                      <code>Sandcat</code> object.
   */
  addRootPath(rootPath:RootPathDescriptor):void;

  /**
   * Returns the root path registered with the specified identifier.
   * 
   * @param {string} rootPathRef the identifier of the root path to retreive.
   * @return {RootPathDescriptor} the root path with the specified the
   *                              identifier.
   */
  getRootPath(rootPathRef:string):RootPathDescriptor;
};
