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

import {LocaleManagerBase, LocaleManager} from "jec-commons-node";
import {SingletonError} from "jec-commons";

/**
 * The <code>SandcatLocaleManager</code> singleton allows to manage the  
 * internationalization context for a Sandcat container.
 */
export class SandcatLocaleManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SandcatLocaleManager</code> instance.
   */
  constructor() {
    let msg:string = null;
    let isInstanciated:boolean = SandcatLocaleManager.INSTANCE !== null;
    if(SandcatLocaleManager._locked || isInstanciated) {
      if(isInstanciated && SandcatLocaleManager.INSTANCE.isInitialized()) {
        msg = SandcatLocaleManager.getInstance().get(
          "errors.singleton", "SandcatLocaleManager"
        );
      } else {
        msg = "You cannot create a SandcatLocaleManager instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    SandcatLocaleManager._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>LocaleManager</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>LocaleManager</code> singleton instance reference.
   */
  private static INSTANCE:LocaleManager = null;

  /**
   * Returns a reference to the <code>LocaleManager</code> singleton.
   *
   * @return {LocaleManager} a reference to the <code>LocaleManager</code>
   *                         singleton.
   */
  public static getInstance():LocaleManager {
    if(SandcatLocaleManager.INSTANCE === null) {
      SandcatLocaleManager._locked = false;
      SandcatLocaleManager.INSTANCE = new LocaleManagerBase();
    }
    return SandcatLocaleManager.INSTANCE;
  }
}
