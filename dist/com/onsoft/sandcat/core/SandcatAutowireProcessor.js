"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceProxyJsletFactory_1 = require("./ResourceProxyJsletFactory");
const RootPathDescriptorFactory_1 = require("./RootPathDescriptorFactory");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const jec_commons_1 = require("jec-commons");
const JarsContextManager_1 = require("../jcad/JarsContextManager");
const SandcatError_1 = require("../exceptions/SandcatError");
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
class SandcatAutowireProcessor {
    constructor() {
        this._resourceFiles = null;
        this._rootPathFiles = null;
        this._sandcatContainer = null;
        this._contextManager = null;
        this.processCompleteHandler = null;
        this.initObj();
    }
    initObj() {
        this._resourceFiles = new Array();
        this._rootPathFiles = new Array();
        this._contextManager = new JarsContextManager_1.JarsContextManager();
        this._contextManager.createContext();
    }
    transformResourceFiles(connector) {
        const context = connector.getContainer().getJsletContext();
        const contextRoot = connector.getContextRoot();
        const resources = new Array();
        const factory = new ResourceProxyJsletFactory_1.ResourceProxyJsletFactory();
        let len = this._resourceFiles.length;
        let jslet = null;
        while (len--) {
            jslet = factory.create(this._resourceFiles[len], contextRoot, this._sandcatContainer);
            context.addJslet(jslet);
        }
        this._resourceFiles.splice(0);
    }
    transformRootPathFiles() {
        const rootPaths = new Array();
        const factory = new RootPathDescriptorFactory_1.RootPathDescriptorFactory();
        let len = this._rootPathFiles.length;
        let rootPath = null;
        while (len--) {
            rootPath = factory.create(this._rootPathFiles[len]);
            this._sandcatContainer.addRootPath(rootPath);
        }
        this._rootPathFiles.splice(0);
    }
    validateCallbackHandler() {
        if (!this.processCompleteHandler) {
            throw new SandcatError_1.SandcatError(SandcatLocaleManager_1.SandcatLocaleManager.getInstance().get("errors.processor"));
        }
    }
    setSandcatContainer(container) {
        this._sandcatContainer = container;
    }
    getSandcatContainer() {
        return this._sandcatContainer;
    }
    processStart(watcher, sourcePath) {
        this.validateCallbackHandler();
    }
    process(file, connector) {
        const decorators = file.decorators;
        const logger = SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance();
        const i18n = SandcatLocaleManager_1.SandcatLocaleManager.getInstance();
        const fileName = file.name;
        let len = decorators.length;
        let decorator = null;
        let classPath = null;
        let decoratorName = null;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SandcatAutowireProcessor.JARS_MASK) {
                if (decoratorName === SandcatAutowireProcessor.RESOURCE_MASK) {
                    this._resourceFiles.push(file);
                    logger.log(i18n.get("autowire.resource", fileName), jec_commons_1.LogLevel.DEBUG);
                }
                else if (decoratorName === SandcatAutowireProcessor.API_MASK) {
                    this._rootPathFiles.push(file);
                    logger.log(i18n.get("autowire.version", fileName), jec_commons_1.LogLevel.DEBUG);
                }
            }
        }
    }
    processComplete(connector, sourcePath) {
        this.validateCallbackHandler();
        this.transformRootPathFiles();
        this.transformResourceFiles(connector);
        this._contextManager.deleteContext();
        this.processCompleteHandler();
    }
}
SandcatAutowireProcessor.JARS_MASK = "jec-jars";
SandcatAutowireProcessor.RESOURCE_MASK = "ResourcePath";
SandcatAutowireProcessor.API_MASK = "RootPath";
exports.SandcatAutowireProcessor = SandcatAutowireProcessor;
