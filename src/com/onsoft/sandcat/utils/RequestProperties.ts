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
 * A helper class that allows to share request properties between sandcat
 * validation routines.
 */
export class RequestProperties {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RequestProperties</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Represents the associated HTTP transaction. Valid values are the constants
   * of the <code>HttpMethod</code> class.
   */
  public httpMethod:string = null;
  
  /**
   * Represents the value of the <code>Accept</code> header field of the 
   * associated HTTP transaction.
   */
  public acccept:string = null;
  
  /**
   * Represents the value of the <code>Content-Type</code> header field of the  
   * associated HTTP transaction.
   */
  public contentType:string = null;
  
  /**
   * Represents the value of the original URL sub-rout of the associated HTTP
   * transaction.
   */
  public subRoute:string = null;
};
