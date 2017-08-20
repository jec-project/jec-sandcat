"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const MethodDescriptorBuilder_1 = require("../../builders/MethodDescriptorBuilder");
class HEADDecorator {
    constructor() { }
    decorate(target, key, descriptor, params) {
        let resourceDesc = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        let builder = new MethodDescriptorBuilder_1.MethodDescriptorBuilder();
        let methodDescriptor = builder.build(jec_commons_1.HttpMethod.HEAD, key, descriptor, params);
        resourceDesc.addMethod(methodDescriptor);
        return target;
    }
}
exports.HEADDecorator = HEADDecorator;
