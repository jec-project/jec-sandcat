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
import {RequestProperties} from "../utils/RequestProperties";
import {HttpStatusCode} from "jec-commons";
import {AnnotationType} from "../reflect/AnnotationType";

/**
 * A helper class that provides methods for working with
 * <code>AnnotationType</code> enum values.
 */
export class AnnotationTypeUtil {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotationTypeUtil</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Retuns a string that represents the name of the specified
   * <code>annotationType</code> parameter.
   * 
   * @param {number} annotationType a value of the <code>AnnotationType</code>
   *                                Enum.
   * @return {string} a string that represents the name of the specified
   *                  <code>annotationType</code> parameter.
   */
  public getParamStringRef(annotationType:number):string {
    let result:string = null;
    if(annotationType === AnnotationType.EXIT) {
      result = "AnnotationType.EXIT";
    } else if(annotationType === AnnotationType.PATH_PARAM) {
      result = "AnnotationType.PATH_PARAM";
    } else if(annotationType === AnnotationType.HTTP_REQUEST) {
      result = "AnnotationType.HTTP_REQUEST";
    } else if(annotationType === AnnotationType.QUERY_PARAM) {
      result = "AnnotationType.QUERY_PARAM";
    } else if(annotationType === AnnotationType.REQUEST_BODY) {
      result = "AnnotationType.REQUEST_BODY";
    } else if(annotationType === AnnotationType.COOKIE_PARAM) {
      result = "AnnotationType.COOKIE_PARAM";
    }
    return result;
  }

  
  /**
   * Retuns a string that represents the name of the specified
   * <code>annotationType</code> method.
   * 
   * @param {number} annotationType a value of the <code>AnnotationType</code>
   *                                Enum.
   * @return {string} a string that represents the name of the specified
   *                  <code>annotationType</code> method.
   */
  public getMethodStringRef(annotationType:number):string {
    let result:string = null;
    if(annotationType === AnnotationType.GET) {
      result = "AnnotationType.GET";
    } else if(annotationType === AnnotationType.POST) {
      result = "AnnotationType.POST";
    } else if(annotationType === AnnotationType.PUT) {
      result = "AnnotationType.PUT";
    } else if(annotationType === AnnotationType.DELETE) {
      result = "AnnotationType.DELETE";
    } else if(annotationType === AnnotationType.CONNECT) {
      result = "AnnotationType.CONNECT";
    } else if(annotationType === AnnotationType.HEAD) {
      result = "AnnotationType.HEAD";
    } else if(annotationType === AnnotationType.OPTIONS) {
      result = "AnnotationType.OPTIONS";
    } else if(annotationType === AnnotationType.TRACE) {
      result = "AnnotationType.TRACE";
    }
    return result;
  }
};
