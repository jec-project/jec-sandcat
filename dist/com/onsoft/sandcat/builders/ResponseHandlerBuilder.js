"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
class ResponseHandlerBuilder {
    constructor() { }
    build(req, res, exit) {
        const handler = (data, err, status) => {
            if (err) {
                SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().log(SandcatLocaleManager_1.SandcatLocaleManager.getInstance().get("errors.sandcat", err), jec_commons_1.LogLevel.ERROR);
                exit(req, res.sendStatus(status || jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR), null);
            }
            else {
                if (status)
                    res.status(status);
                res.send(data);
                exit(req, res, null);
            }
        };
        return handler;
    }
}
exports.ResponseHandlerBuilder = ResponseHandlerBuilder;
;
