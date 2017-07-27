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

import {MethodDescriptor} from "../reflect/MethodDescriptor";
import {RequestProperties} from "../utils/RequestProperties";
import {HttpStatusCode} from "jec-commons";

/**
 * A helper class that provides methods for checking HTTP header parameters
 * during a HTTP transaction.
 */
export class HttpHeadersValidator {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpHeadersValidator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A static constant that indicates that all MIME types can be accepted by the
   * request.
   */
  private static readonly ALL_MIME_TYPES:string = "*/*";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Checks whether the current HTTP header parameters are valid for the
   * method associated whith the target resource. Returns the result of the
   * validation operation as a constant of the <code>HttpStatusCode</code>
   * class.
   * 
   * @param {MethodDescriptor} methodDesc the <code>MethodDescriptor</code> 
   *                                      instance for the current HTTP
   *                                      transaction.
   * @param {RequestProperties} requestProps the <code>RequestProperties</code> 
   *                                         instance that describes the current 
   *                                         HTTP transaction.
   * @return {number} <code>HttpStatusCode.OK</code> whether the current HTTP  
   *    header parameters are valid; <code>HttpStatusCode.NOT_ACCEPTABLE</code>,  
   *    or <code>HttpStatusCode.UNSUPPORTED_MEDIA_TYPE</code> otherwise.
   */
  public validate(methodDesc:MethodDescriptor, 
                                        requestProps:RequestProperties):number {
    let result:number = HttpStatusCode.OK;
    let methodProp:string = methodDesc.consumes;
    let requestProp:string = requestProps.contentType;
    if(methodProp && requestProp.indexOf(methodProp) === -1) {
      return HttpStatusCode.UNSUPPORTED_MEDIA_TYPE;
    }
    //console.log(methodProp, requestProp);
    if(requestProp && requestProp !== HttpHeadersValidator.ALL_MIME_TYPES &&
       !methodProp) {
      return HttpStatusCode.NOT_ACCEPTABLE;
    }
    //console.log(methodProp, requestProp);
    return result;
  }
};
