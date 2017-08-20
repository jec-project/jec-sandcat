"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsletMethodDescriptor_1 = require("../reflect/JsletMethodDescriptor");
class JsletMethodDescriptorBuilder {
    constructor() { }
    build(jsletMethod, key, descriptor) {
        let methodDesc = new JsletMethodDescriptor_1.JsletMethodDescriptor();
        methodDesc.jsletMethod = jsletMethod;
        methodDesc.name = key;
        methodDesc.action = descriptor.value;
        return methodDesc;
    }
}
exports.JsletMethodDescriptorBuilder = JsletMethodDescriptorBuilder;
;
