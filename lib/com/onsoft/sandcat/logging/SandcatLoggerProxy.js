"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class SandcatLoggerProxy extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[SANDCAT]");
        if (SandcatLoggerProxy._locked || SandcatLoggerProxy.INSTANCE) {
            this.throwSingletonError("SandcatLoggerProxy");
        }
        SandcatLoggerProxy._locked = true;
    }
    static getInstance() {
        if (SandcatLoggerProxy.INSTANCE === null) {
            SandcatLoggerProxy._locked = false;
            SandcatLoggerProxy.INSTANCE = new SandcatLoggerProxy();
        }
        return SandcatLoggerProxy.INSTANCE;
    }
}
SandcatLoggerProxy.INSTANCE = null;
SandcatLoggerProxy._locked = true;
exports.SandcatLoggerProxy = SandcatLoggerProxy;
;
