"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_node_1 = require("jec-commons-node");
const jec_commons_1 = require("jec-commons");
class SandcatLocaleManager {
    constructor() {
        const isInstanciated = SandcatLocaleManager.INSTANCE !== null;
        let msg = null;
        if (SandcatLocaleManager._locked || isInstanciated) {
            if (isInstanciated && SandcatLocaleManager.INSTANCE.isInitialized()) {
                msg = SandcatLocaleManager.getInstance().get("errors.singleton", "SandcatLocaleManager");
            }
            else {
                msg = "You cannot create a SandcatLocaleManager instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        SandcatLocaleManager._locked = true;
    }
    static getInstance() {
        if (SandcatLocaleManager.INSTANCE === null) {
            SandcatLocaleManager._locked = false;
            SandcatLocaleManager.INSTANCE = new jec_commons_node_1.LocaleManagerBase();
        }
        return SandcatLocaleManager.INSTANCE;
    }
}
SandcatLocaleManager._locked = true;
SandcatLocaleManager.INSTANCE = null;
exports.SandcatLocaleManager = SandcatLocaleManager;
