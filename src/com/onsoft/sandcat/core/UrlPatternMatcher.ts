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

import {RouteDescriptor} from "../reflect/RouteDescriptor";

/**
 * A Data Transfert Object which contains information about a REST sub-route,
 * including query parameters.
 */
export class UrlPatternMatcher {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>UrlPatternMatcher</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The descriptor for the associated route.
   */
  public descriptor:RouteDescriptor = null;

  /**
   * An object that contains the properties of the matching operation over the
   * associated route.
   */
  public properties:any = null;

  /**
   * An object that contains the query parameters of the matching operation over 
   * the associated route.
   */
  public queryParams:any = null;
}