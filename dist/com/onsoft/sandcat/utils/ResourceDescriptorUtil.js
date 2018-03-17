"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const ParametersMapUtil_1 = require("../utils/ParametersMapUtil");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
class ResourceDescriptorUtil {
    constructor(resource, descriptor, sandcatContainer) {
        this._resource = null;
        this._descriptor = null;
        this.initObj(resource, descriptor, sandcatContainer);
    }
    initObj(resource, descriptor, sandcatContainer) {
        this._resource = resource;
        this._descriptor = descriptor;
        this.initUrlPatterns(sandcatContainer);
    }
    fixParameterMethodDescriptors(descriptor) {
        const paramDescColl = ParametersMapUtil_1.ParametersMapUtil.getParameterCollection(descriptor.name);
        const paramNamesColl = descriptor.parameterNames;
        let len = paramDescColl.length;
        let paramDesc = null;
        let paramName = null;
        while (len--) {
            paramDesc = paramDescColl[len];
            paramName = paramNamesColl[paramDesc.index];
            paramDesc.key = paramName;
            descriptor.parametersMap.set(paramName, paramDesc);
        }
    }
    initUrlPatterns(sandcatContainer) {
        const resourcePath = this._descriptor.resourcePath;
        const descriptorPatterns = new Array();
        const rootPathRefs = this._descriptor.rootPathRefs;
        let len = -1;
        let rootPathRef = null;
        let rootPathDescriptor = null;
        this._urlPatterns = new Array();
        if (rootPathRefs) {
            len = rootPathRefs.length;
            while (len--) {
                rootPathRef = rootPathRefs[len];
                rootPathDescriptor = sandcatContainer.getRootPath(rootPathRef);
                if (rootPathDescriptor) {
                    this._urlPatterns.push(rootPathDescriptor.fullPath + resourcePath);
                }
            }
        }
        else {
            this._urlPatterns.push(resourcePath);
        }
        len = this._urlPatterns.length;
        if (len === 0) {
            SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().log(SandcatLocaleManager_1.SandcatLocaleManager.getInstance().get("mapping.missing", this._descriptor.resourcePath), jec_commons_1.LogLevel.WARN);
        }
        else {
            while (len--) {
                rootPathRef = this._urlPatterns[len];
                descriptorPatterns.push(rootPathRef + jec_commons_1.UrlStringsEnum.PERM_MARK);
            }
        }
        this._descriptor.urlPatterns = descriptorPatterns;
    }
    setMethodUrlPatterns(contextRoot, desc) {
        const urlPatterns = new Array();
        let len = this._urlPatterns.length;
        let rootPathPattern = null;
        let pattern = null;
        while (len--) {
            rootPathPattern = contextRoot + this._urlPatterns[len];
            pattern = rootPathPattern + (desc.route || jec_commons_1.UrlStringsEnum.EMPTY_STRING);
            urlPatterns.push(pattern);
        }
        desc.urlPatterns = urlPatterns;
    }
    decorate() {
        const resource = this._resource;
        Object.defineProperty(resource, "__sandcatResourceDescriptor", {
            enumerable: false,
            configurable: false,
            value: this._descriptor
        });
        Object.defineProperty(resource, "getResourceDescriptor", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function () {
                return resource.__sandcatResourceDescriptor;
            }
        });
    }
    fixCompositeValues() {
        const contextRoot = jec_commons_1.UrlStringsEnum.SLASH +
            this._descriptor.contextRoot;
        this._descriptor.methodsMap.forEach((desc, key, map) => {
            this.setMethodUrlPatterns(contextRoot, desc);
            this.fixParameterMethodDescriptors(desc);
        });
    }
}
exports.ResourceDescriptorUtil = ResourceDescriptorUtil;
;
