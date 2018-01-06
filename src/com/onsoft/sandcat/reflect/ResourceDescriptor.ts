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

import {MethodDescriptor} from "./MethodDescriptor";
import {JsletMethodDescriptor} from "./JsletMethodDescriptor";

/**
 * The <code>ResourceDescriptor</code> class contains information about a REST 
 * resource declared in the Sandcat framework.
 */
export class ResourceDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ResourceDescriptor</code> instance.
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
    this.methodsMap = new Map<string, MethodDescriptor>();
    this.jsletMethodsMap = new Map<number, JsletMethodDescriptor>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * The URL patterns of the jslet associated with this 
   * <code>ResourceDescriptor</code> instance.
   */
  public urlPatterns:Array<string> = null;

  /**
   * The root path of the resource associated with this
   * <code>ResourceDescriptor</code> instance.
   */
  public resourcePath:string = null;

  /**
   * The context root for the resource associated with this 
   * <code>ResourceDescriptor</code> instance.
   */
  public contextRoot:string = null;

  /**
   * The map which is used to store the HTTP methods exposed by the associated
   * resource. This object is initialized whithin the constructor function.
   */
  public methodsMap:Map<string, MethodDescriptor> = null;

  /**
   * The map which is used to store the jslet methods exposed by the associated
   * resource. This object is initialized whithin the constructor function.
   */
  public jsletMethodsMap:Map<number, JsletMethodDescriptor> = null;

  /**
   * The references of the root path objects associated with this 
   * <code>ResourceDescriptor</code> instance.
   */
  public rootPathRefs:string[] = null;

  /**
   * Specifies the MIME media types of representations all resources can respond
   * associated with this <code>ResourceDescriptor</code> instance.
   */
  public consumes:string = null;
  
  /**
   * Specifies the MIME media types of representations all resources can produce
   * associated with this <code>ResourceDescriptor</code> instance.
   */
  public produces:string = null;

  /**
   * Specifies the cross domain access policy associated with this 
   * <code>ResourceDescriptor</code> instance.
   */
  public crossDomainPolicy:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Adds the specified method desciptor to this <code>ResourceDescriptor</code>
   * instance.
   * 
   * @param {MethodDescriptor} methodDescriptor the method desciptor to add.
   */
  public addMethod(methodDescriptor:MethodDescriptor):void {
    this.methodsMap.set(methodDescriptor.name, methodDescriptor);
  }

  /**
   * Adds the specified jslet method desciptor to this 
   * <code>ResourceDescriptor</code> instance.
   * 
   * @param {JsletMethodDescriptor} methodDescriptor the method desciptor to
   *                                                 add.
   */
  public addJsletMethod(methodDescriptor:JsletMethodDescriptor):void {
    this.jsletMethodsMap.set(methodDescriptor.jsletMethod, methodDescriptor);
  }
}