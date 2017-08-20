"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceProxyJsletFactory_1 = require("./ResourceProxyJsletFactory");
const RootPathDescriptorFactory_1 = require("./RootPathDescriptorFactory");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const JarsContextManager_1 = require("../jcad/JarsContextManager");
const SandCatError_1 = require("../exceptions/SandCatError");
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
        let context = connector.getContainer().getJsletContext();
        let len = this._resourceFiles.length;
        let resources = new Array();
        let factory = new ResourceProxyJsletFactory_1.ResourceProxyJsletFactory();
        let jslet = null;
        let contextRoot = connector.getContextRoot();
        while (len--) {
            jslet = factory.create(this._resourceFiles[len], contextRoot, this._sandcatContainer);
            context.addJslet(jslet);
        }
        this._resourceFiles.splice(0);
    }
    transformRootPathFiles() {
        let len = this._rootPathFiles.length;
        let rootPaths = new Array();
        let factory = new RootPathDescriptorFactory_1.RootPathDescriptorFactory();
        let rootPath = null;
        while (len--) {
            rootPath = factory.create(this._rootPathFiles[len]);
            this._sandcatContainer.addRootPath(rootPath);
        }
        this._rootPathFiles.splice(0);
    }
    validateCallbackHandler() {
        if (!this.processCompleteHandler) {
            throw new SandCatError_1.SandcatError("SandcatAutowireProcessor: 'processCompleteHandler' property must not be null.");
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
        let decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        let classPath = null;
        let decoratorName = null;
        let logger = SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance();
        let fileName = file.name;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SandcatAutowireProcessor.JARS_MASK) {
                if (decoratorName === SandcatAutowireProcessor.RESOURCE_MASK) {
                    this._resourceFiles.push(file);
                    logger.log("autowired resource detected: source file='" + fileName + "'");
                }
                else if (decoratorName === SandcatAutowireProcessor.API_MASK) {
                    this._rootPathFiles.push(file);
                    logger.log("autowired REST API detected: source file='" + fileName + "'");
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
