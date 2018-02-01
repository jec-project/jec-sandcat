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

import * as UrlPattern from "url-pattern";
import {HttpMethod} from "jec-commons";

/**
 * The <code>RouteDescriptor</code> class contains information about url
 * patterns.
 */
export class RouteDescriptor {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RouteDescriptor</code> instance.
   * 
   * @param {string} pattern the URL pattern associated with this 
   *                         <code>RouteDescriptor</code> instance.
   * @param {string} mappedMethod the resource method associated with this 
   *                              <code>RouteDescriptor</code> instance.
   * @param {HttpMethod} httpMethod the HTTP method reference associated with  
   *                                this <code>RouteDescriptor</code> instance.
   */
  constructor(pattern:string, mappedMethod:string, httpMethod:HttpMethod) {
    this.initObj(pattern, mappedMethod, httpMethod);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>UrlPattern</code> object responsible for matching URL patterns.
   */
  private _pattern:UrlPattern = null;
  
  /**
   * The string that is used to define the URL pattern.
   */
  private _rawPatternString:string = null;

  /**
   * The HTTP method reference associated with this <code>RouteDescriptor</code>
   * instance.
   */
  private _httpMethod:HttpMethod = null;
  
  /**
   * The mapped method associated with this <code>RouteDescriptor</code>
   * instance.
   */
  private _mappedMethod:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   *
   * @param {string} pattern the URL pattern associated with this 
   *                         <code>RouteDescriptor</code> instance.
   * @param {string} mappedMethod the resource method associated with this 
   *                              <code>RouteDescriptor</code> instance.
   * @param {HttpMethod} httpMethod the HTTP method reference associated with  
   *                                this <code>RouteDescriptor</code> instance.
   */
  private initObj(pattern:string, mappedMethod:string,
                                                   httpMethod:HttpMethod):void {
    this._pattern = new UrlPattern(pattern);
    this._rawPatternString = pattern;
    this._mappedMethod = mappedMethod;
    this._httpMethod = httpMethod;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the string that is used to define the URL pattern.
   *
   * @return {string} the string that is used to define the URL pattern.
   */
  public getPatternString():string {
    return this._rawPatternString;
  }

  /**
   * Returns HTTP method reference associated with this
   * <code>RouteDescriptor</code> instance.
   *
   * @return {HttpMethod} a <code>HttpMethod</code> member.
   */
  public getHttpMethod():HttpMethod {
    return this._httpMethod;
  }

  /**
   * Returns name of the mapped method associated with this
   * <code>RouteDescriptor</code> instance.
   *
   * @return {string} name of the mapped method associated with this 
   *                  <code>RouteDescriptor</code> instance.
   */
  public getMappedMethod():string {
    return this._mappedMethod;
  }

  /**
   * Returns the <code>UrlPattern</code> object associated with this
   * <code>RouteDescriptor</code> instance.
   *
   * @return {UrlPattern} the <code>UrlPattern</code> object associated with 
   *                      this <code>RouteDescriptor</code> instance.
   */
  public getUrlPattern():UrlPattern {
    return this._pattern;
  }
}
