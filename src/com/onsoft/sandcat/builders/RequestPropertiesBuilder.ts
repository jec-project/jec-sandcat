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

import {RequestProperties} from "../utils/RequestProperties";
import {HttpRequest} from "jec-exchange";
import {HttpHeader, HttpMethod} from "jec-commons";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * A helper class that creates new <code>RequestProperties</code> instances.
 */
export class RequestPropertiesBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RequestPropertiesBuilder</code> instance.
   */
  constructor() {
    if(RequestPropertiesBuilder._locked || RequestPropertiesBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(RequestPropertiesBuilder);
    }
    RequestPropertiesBuilder._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>RequestPropertiesBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>RequestPropertiesBuilder</code> singleton instance reference.
   */
  private static INSTANCE:RequestPropertiesBuilder = null;

  /**
   * Returns a reference to the <code>RequestPropertiesBuilder</code>
   * singleton.
   *
   * @return {RequestPropertiesBuilder} a reference to the
   *                            <code>RequestPropertiesBuilder</code> singleton.
   */
  public static getInstance():RequestPropertiesBuilder {
    if(RequestPropertiesBuilder.INSTANCE === null) {
      RequestPropertiesBuilder._locked = false;
      RequestPropertiesBuilder.INSTANCE = new RequestPropertiesBuilder();
    }
    return RequestPropertiesBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>RequestProperties</code> instance.
   * 
   * @param {HttpMethod} httpMethod the current HTTP transaction.
   * @param {HttpRequest} req the original HTTP request for which to create the
   *                          new <code>RequestProperties</code> instance.
   * @return {RequestProperties} a new <code>RequestProperties</code> instance.
   */
  public build(httpMethod:HttpMethod, req:HttpRequest):RequestProperties {
    const props:RequestProperties = new RequestProperties();
    props.httpMethod = httpMethod;
    props.subRoute = req.getOriginalUrl();
    props.acccept = req.getHeader(HttpHeader.ACCEPT);
    props.contentType = req.getHeader(HttpHeader.CONTENT_TYPE);
    return props;
  }
};
