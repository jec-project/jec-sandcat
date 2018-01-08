"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const SandcatAutowireProcessor_1 = require("./SandcatAutowireProcessor");
const SandcatError_1 = require("../exceptions/SandcatError");
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
const path = require("path");
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
    initLocaleManager(container) {
        let localeString = null;
        let localesPath = null;
        let cfg = { directory: "" };
        if (container !== null &&
            container.getLocale !== undefined) {
            localeString = container.getLocale().toString();
            localesPath = path.join(process.cwd(), "node_modules/jec-sandcat/public/locales/");
        }
        else {
            localeString = "en-US";
        }
        cfg.directory = localesPath;
        SandcatLocaleManager_1.SandcatLocaleManager.getInstance().init(localeString, cfg);
    }
    getDomainContainer() {
        return this._domainContainer;
    }
    setDomainContainer(container) {
        this.initLocaleManager(container);
        this._domainContainer = container;
        SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().setLogger(container.getLogger());
        this.sendMessage(SandcatLocaleManager_1.SandcatLocaleManager.getInstance().get("process.domain"));
    }
    process(callback) {
        let i18n = SandcatLocaleManager_1.SandcatLocaleManager.getInstance();
        let processor = null;
        let error = null;
        if (this._domainContainer === null) {
            this.initLocaleManager(null);
            error = new SandcatError_1.SandcatError(i18n.get("errors.domain"));
            callback(error);
        }
        else {
            this.sendMessage(i18n.get("process.start"));
            processor = new SandcatAutowireProcessor_1.SandcatAutowireProcessor();
            processor.setSandcatContainer(this);
            this.sendMessage(i18n.get("process.init"));
            processor.processCompleteHandler = (err) => {
                callback(err);
                this.sendMessage(i18n.get("process.complete"));
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
