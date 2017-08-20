"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const SandcatAutowireProcessor_1 = require("./SandcatAutowireProcessor");
const SandcatError_1 = require("../exceptions/SandcatError");
class DefaultSandcatContainer {
    constructor() {
        this._domainContainer = null;
        this._rootPathList = null;
        this.initObj();
    }
    initObj() {
        SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance();
        this._rootPathList = new Map();
    }
    sendMessage(message, logLevel) {
        SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().log(message, logLevel);
    }
    getDomainContainer() {
        return this._domainContainer;
    }
    setDomainContainer(container) {
        let message = "domain container initialized:";
        this._domainContainer = container;
        SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().setLogger(container.getLogger());
        this.sendMessage(message);
    }
    process(callback) {
        let message = "Sandcat process start";
        let processor = null;
        let error = null;
        this.sendMessage(message);
        if (this._domainContainer === null) {
            message = "Sandcat error: DomainContainer must not be null";
            this.sendMessage(message);
            error = new SandcatError_1.SandcatError(message);
            callback(error);
        }
        else {
            processor = new SandcatAutowireProcessor_1.SandcatAutowireProcessor();
            processor.setSandcatContainer(this);
            processor.processCompleteHandler = (err) => {
                callback(err);
                this.sendMessage("Sandcat process complete");
                processor.processCompleteHandler = null;
            };
            this._domainContainer.getSourceFileInspector().addProcessor(processor);
        }
    }
    addRootPath(rootPath) {
        this._rootPathList.set(rootPath.ref, rootPath);
    }
    getRootPath(rootPathRef) {
        let rootPath = this._rootPathList.get(rootPathRef);
        return rootPath;
    }
}
exports.DefaultSandcatContainer = DefaultSandcatContainer;
;
