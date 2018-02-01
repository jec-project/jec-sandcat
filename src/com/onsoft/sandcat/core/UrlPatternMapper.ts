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

import {UrlStringsEnum, HttpMethod} from "jec-commons";
import {RouteDescriptor} from "../reflect/RouteDescriptor";
import {UrlPatternMatcher} from "./UrlPatternMatcher";
import * as QueryString from "qs";
import {RequestProperties} from "../utils/RequestProperties";
import {RouteDescriptorUtil} from "../utils/RouteDescriptorUtil";

/**
 * The <code>UrlPatternMapper</code> class allows to map REST URL patterns with 
 * methods provided by a a Sandcat resource object.
 */
export class UrlPatternMapper {
  
  /**
   * Creates a new <code>UrlPatternMapper</code> instance.
   */
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The collection of <code>RouteDescriptor</code> associated with a Sandcat 
   * resource object.
   */
  private _routeDescMap:Map<string, RouteDescriptor[]> = null;

  /**
   * The <code>RouteDescriptorUtil</code> instance that is used to manipulate
   * <code>RouteDescriptor</code> objects.
   */
  private _routeDescriptorUtil:RouteDescriptorUtil = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._routeDescMap = new Map<string, RouteDescriptor[]>();
    this._routeDescriptorUtil = new RouteDescriptorUtil();
  }

  /**
   * Extracts query parameters from the specified URL.
   * 
   * @param {string} url the URL from which to extract query parameters.
   * @return an object that contains all query parameters
   */
  private getQueryParams(url:string):any {
    return QueryString.parse(url);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a <code>RouteDescriptor</code> object to this
   * <code>UrlPatternMapper</code> instance.
   * 
   * @param {RouteDescriptor} routeDescriptor the <code>RouteDescriptor</code> 
   *                                          object to this
   *                                          <code>UrlPatternMapper</code>
   *                                          instance.
   */
  public addRouteDescriptor(routeDescriptor:RouteDescriptor):void {
    let methodName:HttpMethod = routeDescriptor.getHttpMethod();
    let coll:RouteDescriptor[] = null;
    if(this._routeDescMap.has(methodName)) {
      coll = this._routeDescMap.get(methodName);
    } else {
      coll = new Array<RouteDescriptor>();
      this._routeDescMap.set(methodName, coll);
    }
    coll.push(routeDescriptor);
  }

  /**
   * return a boolean that indicates whether the specified method reference has
   * been registered (<code>true</code>), or  not (<code>false</code>).
   * 
   * @param {string} methodName the name of the method fo find.
   * @return {boolean} <code>true</code>  whether the specified method reference
   *                   has been registered; <code>false</code> otherwise.
   */
  public hasRegisteredMethod(methodName:string):boolean {
    return this._routeDescMap.has(methodName);
  }

  /**
   * Checks whether the specified route matches a URL pattern registered whithin
   * this <code>UrlPatternMapper</code> instance.
   * 
   * @param {RequestProperties} requestProperties the 
   *                            <code>RequestProperties</code> object that 
   *                            contains information about the request to check.
   */
  public matchRequest(requestProperties:RequestProperties):UrlPatternMatcher {
    let htppMethod:HttpMethod = requestProperties.httpMethod;
    let subRoute:string = requestProperties.subRoute;
    let matcher:UrlPatternMatcher = null;
    let properties:any = null;
    let descriptor:RouteDescriptor = null;
    let coll:RouteDescriptor[] = null;
    let position:number = subRoute.indexOf(UrlStringsEnum.MARK);
    let subRoutePath:string = subRoute;
    let query:string = null;
    if(position !== -1) {
       subRoutePath = subRoute.substr(0, position);
       query = subRoute.substring(position + 1);
    }
    if(this._routeDescMap.has(htppMethod)) {
      coll = this._routeDescMap.get(htppMethod);
      position = coll.length;
      while(position--) {
        descriptor = coll[position];
        properties = this._routeDescriptorUtil.exec(descriptor, subRoutePath);
        if(properties) {
          matcher = new UrlPatternMatcher();
          matcher.descriptor = descriptor;
          matcher.properties = properties;
          matcher.queryParams = this.getQueryParams(query);
          break;
        }
      }
    }
    return matcher;
  }
}