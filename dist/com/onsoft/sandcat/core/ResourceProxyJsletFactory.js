"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SandcatResourceJsletProxy_1 = require("../jslet/SandcatResourceJsletProxy");
const jec_commons_1 = require("jec-commons");
const ResourceDescriptorRegistry_1 = require("../metadata/ResourceDescriptorRegistry");
const ResourceDescriptor_1 = require("../reflect/ResourceDescriptor");
const ResourceDescriptorUtil_1 = require("../utils/ResourceDescriptorUtil");
const jec_sokoke_1 = require("jec-sokoke");
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
        jec_sokoke_1.SokokeInjector.getInstance()
            .inject(resourceObj, jec_sokoke_1.SokokeInjector.DEFAULT_SCOPE_TYPES);
        ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.registerDescriptor(null);
        return jslet;
    }
}
exports.ResourceProxyJsletFactory = ResourceProxyJsletFactory;
;
