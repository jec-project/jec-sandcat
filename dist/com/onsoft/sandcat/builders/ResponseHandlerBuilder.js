"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
class ResponseHandlerBuilder {
    constructor() { }
    sendMessage(message, logLevel) {
        SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().log(message, logLevel);
    }
    build(req, res, exit) {
        let handler = (data, err, status) => {
            if (status)
                res.status(status);
            if (err) {
                this.sendMessage("Sandcat error: " + err, jec_commons_1.LogLevel.ERROR);
            }
            else {
                exit(req, res.send(data), null);
            }
        };
        return handler;
    }
}
exports.ResponseHandlerBuilder = ResponseHandlerBuilder;
;
