"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const JsletMethodDescriptorBuilder_1 = require("../../builders/JsletMethodDescriptorBuilder");
const JsletMethod_1 = require("../../reflect/JsletMethod");
class DestroyDecorator {
    constructor() { }
    decorate(target, key, descriptor) {
        const resourceDesc = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        const methodDescriptor = JsletMethodDescriptorBuilder_1.JsletMethodDescriptorBuilder.getInstance().build(JsletMethod_1.JsletMethod.DESTROY, key, descriptor);
        resourceDesc.addJsletMethod(methodDescriptor);
        return descriptor;
    }
}
exports.DestroyDecorator = DestroyDecorator;
