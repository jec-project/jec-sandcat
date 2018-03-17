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

import {UrlPatternMapper} from "../core/UrlPatternMapper";
import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {MethodDescriptor} from "../reflect/MethodDescriptor";
import {RouteDescriptor} from "../reflect/RouteDescriptor";
import {HttpMethod} from "jec-commons";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * A helper class that creates <code>UrlPatternMapper</code> objects.
 */
export class UrlPatternMapperBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>UrlPatternMapperBuilder</code> instance.
   */
  constructor() {
    if(UrlPatternMapperBuilder._locked || UrlPatternMapperBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(UrlPatternMapperBuilder);
    }
    UrlPatternMapperBuilder._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>UrlPatternMapperBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>UrlPatternMapperBuilder</code> singleton instance reference.
   */
  private static INSTANCE:UrlPatternMapperBuilder = null;

  /**
   * Returns a reference to the <code>UrlPatternMapperBuilder</code>
   * singleton.
   *
   * @return {UrlPatternMapperBuilder} a reference to the
   *                             <code>UrlPatternMapperBuilder</code> singleton.
   */
  public static getInstance():UrlPatternMapperBuilder {
    if(UrlPatternMapperBuilder.INSTANCE === null) {
      UrlPatternMapperBuilder._locked = false;
      UrlPatternMapperBuilder.INSTANCE = new UrlPatternMapperBuilder();
    }
    return UrlPatternMapperBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and adds to the specified <code>UrlPatternMapper</code> instance a
   * collection of <code>RouteDescriptor</code> objects, built from the 
   * specified method descriptor.
   * 
   * @param {UrlPatternMapper} mapper the URL mapper for which to create and add
   *                                  new <code>RouteDescriptor</code>
   *                                  instances. 
   * @param {MethodDescriptor} desc the <code>MethodDescriptor</code> from which 
   *                                the new <code>RouteDescriptor</code> are
   *                                built. 
   */
   private buildRouteDescriptors(mapper:UrlPatternMapper,
                                                   desc:MethodDescriptor):void {
      const urlPatterns:string[] = desc.urlPatterns;
      const name:string = desc.name;
      const httpMethod:HttpMethod = desc.httpMethod;
      let len:number = urlPatterns.length;
      let routeDesc:RouteDescriptor = null;
      while(len--) {
        routeDesc = new RouteDescriptor(urlPatterns[len], name, httpMethod);
        mapper.addRouteDescriptor(routeDesc);
      }
   }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>UrlPatternMapper</code> instance.
   * 
   * @method build
   * @param {ResourceDescriptor} descriptor the <code>ResourceDescriptor</code> 
   *                                        instance associated whih the new URL
   *                                        mapper. 
   * @return {UrlPatternMapper} a new <code>UrlPatternMapper</code> instance. 
   */
  public build(descriptor:ResourceDescriptor):UrlPatternMapper {
    const mapper:UrlPatternMapper = new UrlPatternMapper();
    const methodsMap:Map<string, MethodDescriptor> = descriptor.methodsMap;
    methodsMap.forEach((value:MethodDescriptor, key:string,
                                          map:Map<string, MethodDescriptor>)=> {
        this.buildRouteDescriptors(mapper, value);
    });
    return mapper;
  }
};
