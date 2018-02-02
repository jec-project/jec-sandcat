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

import {MethodDescriptor} from "../reflect/MethodDescriptor";
import {HttpMethodParams} from "jec-jars";
import * as fnArgs from "function-arguments";
import {HttpMethod} from "jec-commons";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * A helper class that creates <code>MethodDescriptor</code> instances.
 */
export class MethodDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>MethodDescriptorBuilder</code> instance.
   */
  constructor() {
    if(MethodDescriptorBuilder._locked || MethodDescriptorBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(MethodDescriptorBuilder);
    }
    MethodDescriptorBuilder._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>MethodDescriptorBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>MethodDescriptorBuilder</code> singleton instance reference.
   */
  private static INSTANCE:MethodDescriptorBuilder = null;

  /**
   * Returns a reference to the <code>MethodDescriptorBuilder</code>
   * singleton.
   *
   * @return {MethodDescriptorBuilder} a reference to the
   *                             <code>MethodDescriptorBuilder</code> singleton.
   */
  public static getInstance():MethodDescriptorBuilder {
    if(MethodDescriptorBuilder.INSTANCE === null) {
      MethodDescriptorBuilder._locked = false;
      MethodDescriptorBuilder.INSTANCE = new MethodDescriptorBuilder();
    }
    return MethodDescriptorBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>MethodDescriptor</code> instance.
   * 
   * @param {HttpMethod} httpMethod the HTTP method associated with the 
   *                                decorated method.
   * @param {string} key the name of the decorated method.
   * @param {PropertyDescriptor} descriptor the property descriptor associated
   *                                        with the decorated method.
   * @return {MethodDescriptor} a new <code>MethodDescriptor</code> instance.
   */
  public build(httpMethod:HttpMethod, key:string,
                                  descriptor:PropertyDescriptor,
                                  params?:HttpMethodParams):MethodDescriptor {
    let methodDesc:MethodDescriptor = new MethodDescriptor();
    let action:Function = descriptor.value;
    let route:string = null;
    methodDesc.httpMethod = httpMethod;
    methodDesc.name = key;
    methodDesc.action = action;
    methodDesc.parameterNames = fnArgs(descriptor.value);
    if(params) {
      methodDesc.route = params.route || null;
      methodDesc.produces = params.produces || null;
      methodDesc.consumes = params.consumes || null;
      methodDesc.crossDomainPolicy = params.crossDomainPolicy || null;
    }
    return methodDesc;
  }
};
