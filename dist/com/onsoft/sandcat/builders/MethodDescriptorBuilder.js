"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MethodDescriptor_1 = require("../reflect/MethodDescriptor");
const fnArgs = require("function-arguments");
class MethodDescriptorBuilder {
    constructor() { }
    build(httpMethod, key, descriptor, params) {
        let methodDesc = new MethodDescriptor_1.MethodDescriptor();
        let action = descriptor.value;
        let route = null;
        methodDesc.httpMethod = httpMethod;
        methodDesc.name = key;
        methodDesc.action = action;
        methodDesc.parameterNames = fnArgs(descriptor.value);
        if (params) {
            methodDesc.route = params.route || null;
            methodDesc.produces = params.produces || null;
            methodDesc.consumes = params.consumes || null;
            methodDesc.crossDomainPolicy = params.crossDomainPolicy || null;
        }
        return methodDesc;
    }
}
exports.MethodDescriptorBuilder = MethodDescriptorBuilder;
;
