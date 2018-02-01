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

import {ParameterDescriptor} from "./ParameterDescriptor";
import {HttpMethod} from "jec-commons";

/**
 * The <code>MethodDescriptor</code> class contains information about a function 
 * mapped to an HTTP method in the Sandcat framework.
 */
export class MethodDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>MethodDescriptor</code> instance.
   */
  constructor() {
    this.initObj();
   }

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initializes this object.
   */
  private initObj():void {
    this.parametersMap = new Map<string, ParameterDescriptor>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * The reference to the HTTP method mapped whih the resource function. Valid
   * values are the constants of the <code>HttpMethod</code> class.
   */
  public httpMethod:HttpMethod = null;

  /**
   * The name of the mapped resource function.
   */
  public name:string = null;

  /**
   * The reference to the mapped resource function.
   */
  public action:Function = null;

  /**
   * A collection that contains rhe reference to the parameters names of the 
   * mapped resource function. Parameter names apear in their declaration order.
   */
  public parameterNames:string[] = null;

  /**
   * The mask used as URI sub-route for the HTTP method mapped whih the resource
   * function.
   */
  public route:string = null;

  /**
   * Specifies the MIME media types of representations the HTTP method mapped 
   * whih the resource function can respond to.
   */
  public consumes:string = null;

  /**
   * Specifies the MIME media types of representations the HTTP method mapped 
   * whih the resource function can produce.
   */
  public produces:string = null;

  /**
   * Specifies the cross domain access policy for the HTTP method mapped whih
   * the resource function can respond to.
   */
  public crossDomainPolicy:string = null;

  /**
   * The list of URl patterns for the HTTP method mapped whih the resource
   * function.
   */
  public urlPatterns:string[] = null;

  /**
   * The map which is used to store the HTTP methods exposed by the associated
   * resource.
   */
  public parametersMap:Map<string, ParameterDescriptor> = null;
}