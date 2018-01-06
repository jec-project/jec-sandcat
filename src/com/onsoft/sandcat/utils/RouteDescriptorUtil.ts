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
import {RouteDescriptor} from "../reflect/RouteDescriptor";

/**
 * The <code>RouteDescriptorUtil</code> class contains utility methods for
 * working with <code>RouteDescriptor</code> objects.
 */
export class RouteDescriptorUtil {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RouteDescriptorUtil</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Tests whether the specified URL matches this route, or not, and processes 
   * the <code>success</code>, or <code>fails</code> callback function,
   * depending on the result of the operation.
   *
   * @param {RouteDescriptor} descriptor the <code>RouteDescriptor</code> for
   *                                     which to test the URL.
   * @param {string} url the URL to test.
   * @param {Function} success handles the result of the operation whether the
   *                           specified URL matches this route. This methods
   *                           takes one parameter which contains the result of
   *                           the operation.
   * @param {Function} fail handles the result of the operation whether the
   *                        specified URL does not matche this route.
   */
  public match(descriptor:RouteDescriptor, url:string,
                               success:(result:any)=>void, fail:()=>void):void {
    let result:any = descriptor.getUrlPattern().match(url);
    if(result) success(result);
    else fail();
  }
  
  /**
   * Returns a boolean that indicates whether the specified URL matches this
   * route (<code>true</code>), or not (<code>false</code>).
   *
   * @param {RouteDescriptor} descriptor the <code>RouteDescriptor</code> for
   *                                     which to test the URL.
   * @param {string} url the URL to test.
   * @return {boolean} <code>true</code> whether the specified URL matches this
   *                   route; <code>false</code> otherwise.
   */
  public test(descriptor:RouteDescriptor, url:string):boolean {
    return descriptor.getUrlPattern().match(url) ? true : false;
  }
  
  /**
   * Returns an object that represents the route parameters whether the
   * specified URL matches this route, or <code>null</code> if the URL does not
   * match this route.
   *
   * @param {RouteDescriptor} descriptor the <code>RouteDescriptor</code> for
   *                                     which to test the URL.
   * @param {string} url the URL to test.
   * @return {any} the route parameters of the specified URL, or
   *               <code>null</code>.
   */
  public exec(descriptor:RouteDescriptor, url:string):any {
    return descriptor.getUrlPattern().match(url);
  }
}
