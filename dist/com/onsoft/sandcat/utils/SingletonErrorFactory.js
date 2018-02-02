"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
const jec_commons_1 = require("jec-commons");
class SingletonErrorFactory {
    constructor() { }
    throw(contextClass) {
        let msg = null;
        let classRef = contextClass.constructor.name;
        let i18n = SandcatLocaleManager_1.SandcatLocaleManager.getInstance();
        if (i18n.isInitialized()) {
            msg = i18n.get("errors.singleton", classRef);
        }
        else {
            msg =
                `You cannot create a ${classRef} instance; use getInstance() instead.`;
        }
        throw new jec_commons_1.SingletonError(msg);
    }
}
exports.SingletonErrorFactory = SingletonErrorFactory;
