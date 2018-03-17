"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MethodDescriptor_1 = require("../reflect/MethodDescriptor");
const fnArgs = require("function-arguments");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class MethodDescriptorBuilder {
    constructor() {
        if (MethodDescriptorBuilder._locked || MethodDescriptorBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(MethodDescriptorBuilder);
        }
        MethodDescriptorBuilder._locked = true;
    }
    static getInstance() {
        if (MethodDescriptorBuilder.INSTANCE === null) {
            MethodDescriptorBuilder._locked = false;
            MethodDescriptorBuilder.INSTANCE = new MethodDescriptorBuilder();
        }
        return MethodDescriptorBuilder.INSTANCE;
    }
    build(httpMethod, key, descriptor, params) {
        const methodDesc = new MethodDescriptor_1.MethodDescriptor();
        const action = descriptor.value;
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
MethodDescriptorBuilder._locked = true;
MethodDescriptorBuilder.INSTANCE = null;
exports.MethodDescriptorBuilder = MethodDescriptorBuilder;
;
