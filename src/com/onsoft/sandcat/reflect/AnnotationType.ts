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

/**
 * Contains the values that indicate the type of annotation  associated with a
 * Sandcat parameter.
 */
export enum AnnotationType {

  /**
   * The type used to specify a <code>@Exit</code> annotation.
   */
  EXIT = 0,

  /**
   * The type used to specify a <code>@PathParam</code> annotation.
   */
  PATH_PARAM = 1,

  /**
   * The type used to specify a <code>@QueryParam</code> annotation.
   */
  QUERY_PARAM = 2,

  /**
   * The type used to specify a <code>@HttpRequest</code> annotation.
   */
  HTTP_REQUEST = 3,
  
  /**
   * The type used to specify a <code>@RequestBody</code> annotation.
   */
  REQUEST_BODY = 4,

  /**
   * The type used to specify a <code>@CookieParam</code> annotation.
   */
  COOKIE_PARAM = 5,
  
  /**
   * The type used to specify a <code>@GET</code> annotation.
   */
  GET = 10,
  
  /**
   * The type used to specify a <code>@POST</code> annotation.
   */
  POST = 11,
  
  /**
   * The type used to specify a <code>@PUT</code> annotation.
   */
  PUT = 12,
  
  /**
   * The type used to specify a <code>@DELETE</code> annotation.
   */
  DELETE = 13,

  /**
   * The type used to specify a <code>@CONNECT</code> annotation.
   */
  CONNECT = 14,

  /**
   * The type used to specify a <code>@HEAD</code> annotation.
   */
  HEAD = 15,
  
  /**
   * The type used to specify a <code>@OPTIONS</code> annotation.
   */
  OPTIONS = 16,
  
  /**
   * The type used to specify a <code>@TRACE</code> annotation.
   */
  TRACE = 17
}