"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsletMethodDescriptor_1 = require("../reflect/JsletMethodDescriptor");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class JsletMethodDescriptorBuilder {
    constructor() {
        if (JsletMethodDescriptorBuilder._locked ||
            JsletMethodDescriptorBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(JsletMethodDescriptorBuilder);
        }
        JsletMethodDescriptorBuilder._locked = true;
    }
    static getInstance() {
        if (JsletMethodDescriptorBuilder.INSTANCE === null) {
            JsletMethodDescriptorBuilder._locked = false;
            JsletMethodDescriptorBuilder.INSTANCE =
                new JsletMethodDescriptorBuilder();
        }
        return JsletMethodDescriptorBuilder.INSTANCE;
    }
    build(jsletMethod, key, descriptor) {
        const methodDesc = new JsletMethodDescriptor_1.JsletMethodDescriptor();
        methodDesc.jsletMethod = jsletMethod;
        methodDesc.name = key;
        methodDesc.action = descriptor.value;
        return methodDesc;
    }
}
JsletMethodDescriptorBuilder._locked = true;
JsletMethodDescriptorBuilder.INSTANCE = null;
exports.JsletMethodDescriptorBuilder = JsletMethodDescriptorBuilder;
;
