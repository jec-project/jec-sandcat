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

import {ResourceDescriptor} from "../reflect/ResourceDescriptor";
import {MethodDescriptor} from "../reflect/MethodDescriptor";
import {ParameterDescriptor} from "../reflect/ParameterDescriptor";
import {UrlStringsEnum, LogLevel} from "jec-commons";
import {ParametersMapUtil} from "../utils/ParametersMapUtil";
import {Sandcat} from "../Sandcat";
import {RootPathDescriptor} from "../reflect/RootPathDescriptor";
import {SandcatLoggerProxy} from "../logging/SandcatLoggerProxy";
import {SandcatLocaleManager} from "../i18n/SandcatLocaleManager";

/**
 * A helper class that decorates a jslet by adding it
 * <code>ResourceDescriptor</code> capabilities.
 */
export class ResourceDescriptorUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RequestProperties</code> instance.
   * 
   * @param {any} resource the resource object to decorate.
   * @param {ResourceDescriptor} descriptor the <code>ResourceDescriptor</code>
   *                                        object associated with the specified
   *                                        resource object to decorate.
   * @param {Sandcat} sandcatContainer the sandcat container associated with
   *                                   the specified resource object to
   *                                   decorate.
   */
  constructor(resource:any, descriptor:ResourceDescriptor,
                                                     sandcatContainer:Sandcat) {
    this.initObj(resource, descriptor, sandcatContainer);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The resource object decorated by this utility class.
   */
  private _resource:any = null;

  /**
   * The <code>ResourceDescriptor</code> associated with the specified resource 
   * object to decorate.
   */
  private _descriptor:ResourceDescriptor = null;

  /**
   * The liste of URL patterns associated with the specified resource object to 
   * decorate. URL patterns are computed from the root path objects  associated
   * with the resource object.
   */
  private _urlPatterns:string[];

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {any} resource the resource object to decorate.
   * @param {ResourceDescriptor} descriptor the <code>ResourceDescriptor</code>
   *                                        object associated with the specified
   *                                        resource object to decorate.
   * @param {Sandcat} sandcatContainer the sandcat container associated with
   *                                   the specified resource object to
   *                                   decorate.
   */
  private initObj(resource:any, descriptor:ResourceDescriptor,
                                                sandcatContainer:Sandcat):void {
    this._resource = resource;
    this._descriptor = descriptor;
    this.initUrlPatterns(sandcatContainer);
  }

  /**
   * Fixes all parameter properties for the specified
   * <code>MethodDescriptor</code> object.
   * 
   * @param {MethodDescriptor} descriptor the <code>MethodDescriptor</code> 
   *                                      object for which to fix all parameter
   *                                      values.
   */
  private fixParameterMethodDescriptors(descriptor:MethodDescriptor):void {
    const paramDescColl:ParameterDescriptor[] =
                      ParametersMapUtil.getParameterCollection(descriptor.name);
    const paramNamesColl:string[] = descriptor.parameterNames;
    let len:number = paramDescColl.length;
    let paramDesc:ParameterDescriptor = null;
    let paramName:string = null;
    while(len--) {
      paramDesc = paramDescColl[len];
      paramName = paramNamesColl[paramDesc.index];
      paramDesc.key = paramName;
      descriptor.parametersMap.set(paramName, paramDesc);
    }
  }

  /**
   * Initializes the URL patterns of resource object to decorate, by using the
   * context root specified by the sandcat container.
   * 
   * @param {Sandcat} sandcatContainer the sandcat container associated with
   *                                   the specified resource object to
   *                                   decorate.
   */
  private initUrlPatterns(sandcatContainer:Sandcat):void {
    const resourcePath:string = this._descriptor.resourcePath;
    const descriptorPatterns:Array<string> = new Array<string>();
    const rootPathRefs:string[] = this._descriptor.rootPathRefs;
    let len:number = -1;
    let rootPathRef:string = null;
    let rootPathDescriptor:RootPathDescriptor = null;
    this._urlPatterns = new Array<string>();
    if(rootPathRefs) {
      len = rootPathRefs.length;
      while(len--) {
        rootPathRef = rootPathRefs[len];
        rootPathDescriptor = sandcatContainer.getRootPath(rootPathRef);
        if(rootPathDescriptor) {
          this._urlPatterns.push(rootPathDescriptor.fullPath + resourcePath);
        }
      }
    } else {
      this._urlPatterns.push(resourcePath);
    }
    len = this._urlPatterns.length;
    if(len === 0) {
      SandcatLoggerProxy.getInstance().log(
        SandcatLocaleManager.getInstance().get(
          "mapping.missing", this._descriptor.resourcePath
        ),
        LogLevel.WARN
      );
    } else {
      while(len--) {
        rootPathRef = this._urlPatterns[len];
        descriptorPatterns.push(rootPathRef + UrlStringsEnum.PERM_MARK);
      }
    }
    this._descriptor.urlPatterns = descriptorPatterns;
  }

  /**
   * Sets the URL patterns of the specified method descriptor.
   * 
   * @param {string} contextRoot the context root property of the container
   *                             that contains the resource to decorate.
   * @param {MethodDescriptor} desc the method descriptor for which to set the
   *                                URL patterns.
   */
  private setMethodUrlPatterns(contextRoot:string, desc:MethodDescriptor):void {
    const urlPatterns:string[] = new Array<string>();
    let len:number = this._urlPatterns.length;
    let rootPathPattern:string = null;
    let pattern:string = null;
    while(len--){
      rootPathPattern = contextRoot + this._urlPatterns[len];
      pattern = rootPathPattern + (desc.route || UrlStringsEnum.EMPTY_STRING);
      urlPatterns.push(pattern);
    }
    desc.urlPatterns = urlPatterns;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds <code>MethodDescriptor</code> capabilities to the specified resource
   * object.
   */
  public decorate():void {
    const resource:any = this._resource;
    Object.defineProperty(
      resource,
      "__sandcatResourceDescriptor",
      {
        enumerable: false,
        configurable: false,
        value: this._descriptor
      }
    );
    Object.defineProperty(
      resource,
      "getResourceDescriptor",
      {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function():ResourceDescriptor {
          return resource.__sandcatResourceDescriptor;
        }
      }
    );
  }

  /**
   * Fixes the all of the composite values for the <code>MethodDescriptor</code> 
   * object associated with the decorated resource object.
   */
  public fixCompositeValues():void {
    const contextRoot:string = UrlStringsEnum.SLASH +
                                                   this._descriptor.contextRoot;
    this._descriptor.methodsMap.forEach(
      (desc:MethodDescriptor, key:string, map:Map<string, MethodDescriptor>)=> {
        this.setMethodUrlPatterns(contextRoot, desc);
        this.fixParameterMethodDescriptors(desc);
      }
    );
  }
};
