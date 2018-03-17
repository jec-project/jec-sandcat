"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const MethodDescriptorBuilder_1 = require("../../builders/MethodDescriptorBuilder");
class TRACEDecorator {
    constructor() { }
    decorate(target, key, descriptor, params) {
        const resourceDesc = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        const methodDescriptor = MethodDescriptorBuilder_1.MethodDescriptorBuilder.getInstance().build(jec_commons_1.HttpMethod.TRACE, key, descriptor, params);
        resourceDesc.addMethod(methodDescriptor);
        return descriptor;
    }
}
exports.TRACEDecorator = TRACEDecorator;
