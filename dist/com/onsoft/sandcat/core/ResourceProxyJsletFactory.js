"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SandcatResourceJsletProxy_1 = require("../jslet/SandcatResourceJsletProxy");
const jec_commons_1 = require("jec-commons");
const ResourceDescriptorRegistry_1 = require("../metadata/ResourceDescriptorRegistry");
const ResourceDescriptor_1 = require("../reflect/ResourceDescriptor");
const ResourceDescriptorUtil_1 = require("../utils/ResourceDescriptorUtil");
class ResourceProxyJsletFactory {
    constructor() { }
    create(file, contextRoot, sandcatContainer) {
        const descriptor = new ResourceDescriptor_1.ResourceDescriptor();
        ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.registerDescriptor(descriptor);
        descriptor.contextRoot = contextRoot;
        const jslet = new SandcatResourceJsletProxy_1.SandcatResourceJsletProxy();
        const filePath = jec_commons_1.PathUtils.getInstance().buildFilePath(file.path, file.name);
        const ConstObj = jec_commons_1.GlobalClassLoader.getInstance().loadClass(filePath);
        const resourceObj = new ConstObj();
        const descriptorUtil = new ResourceDescriptorUtil_1.ResourceDescriptorUtil(resourceObj, descriptor, sandcatContainer);
        descriptorUtil.decorate();
        descriptorUtil.fixCompositeValues();
        jslet.setResource(resourceObj);
        ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.registerDescriptor(null);
        return jslet;
    }
}
exports.ResourceProxyJsletFactory = ResourceProxyJsletFactory;
;
