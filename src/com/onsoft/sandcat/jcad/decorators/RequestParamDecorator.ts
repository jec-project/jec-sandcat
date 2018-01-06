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

import {Decorator} from "jec-commons";
import {HttpMethodParams} from "jec-jars";
import {AnnotationParamFactory} from "../../annotations/AnnotationParamFactory";
import {AnnotationType} from "../../reflect/AnnotationType";

/**
 * The <code>RequestParamDecorator</code> class defines the  
 * <code>Decorator</code> implementation for the JARS <code>@RequestParam</code>
 * decorator.
 */
export class RequestParamDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RequestParamDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, propertyKey:string | symbol,
                                                    parameterIndex:number):any {
    let factory:AnnotationParamFactory = new AnnotationParamFactory();
    factory.registerParam(
      propertyKey, parameterIndex, AnnotationType.HTTP_REQUEST
    );
    return target;
  }
}
