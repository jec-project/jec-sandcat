"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterDescriptor_1 = require("../reflect/ParameterDescriptor");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class ParameterDescriptorBuilder {
    constructor() {
        if (ParameterDescriptorBuilder._locked ||
            ParameterDescriptorBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(ParameterDescriptorBuilder);
        }
        ParameterDescriptorBuilder._locked = true;
    }
    static getInstance() {
        if (ParameterDescriptorBuilder.INSTANCE === null) {
            ParameterDescriptorBuilder._locked = false;
            ParameterDescriptorBuilder.INSTANCE = new ParameterDescriptorBuilder();
        }
        return ParameterDescriptorBuilder.INSTANCE;
    }
    build(methodName, annotationType, parameterIndex) {
        const paramDesc = new ParameterDescriptor_1.ParameterDescriptor();
        paramDesc.annotationType = annotationType;
        paramDesc.index = parameterIndex;
        paramDesc.methodName = methodName;
        return paramDesc;
    }
}
ParameterDescriptorBuilder._locked = true;
ParameterDescriptorBuilder.INSTANCE = null;
exports.ParameterDescriptorBuilder = ParameterDescriptorBuilder;
;
