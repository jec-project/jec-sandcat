"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const JsletMethodDescriptorBuilder_1 = require("../../builders/JsletMethodDescriptorBuilder");
const JsletMethod_1 = require("../../reflect/JsletMethod");
class InitDecorator {
    constructor() { }
    decorate(target, key, descriptor) {
        let resourceDesc = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        let builder = new JsletMethodDescriptorBuilder_1.JsletMethodDescriptorBuilder();
        let methodDescriptor = builder.build(JsletMethod_1.JsletMethod.INIT, key, descriptor);
        resourceDesc.addJsletMethod(methodDescriptor);
        return descriptor;
    }
}
exports.InitDecorator = InitDecorator;
