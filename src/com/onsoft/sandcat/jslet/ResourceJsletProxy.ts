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

import {Jslet} from "jec-exchange";

/**
 * The <code>ResourceJsletProxy</code> interface provides the default API that 
 * you must implement to create a jslet for proxifying Sandcat resource classes.
 */
export interface ResourceJsletProxy extends Jslet {

  /**
   * Returns the resource associated with this <code>ResourceJsletProxy</code>.
   *
   * @return {any} the reference to the resource associated  with this 
   *               <code>ResourceJsletProxy</code>.
   */
  getResource():any;

  /**
   * Sets the resource to associate with this <code>ResourceJsletProxy</code>.
   *
   * @param {any} resource the resource to associate with this 
   *                       <code>ResourceJsletProxy</code>.
   */
  setResource(resource:any):void;
}
