"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterDescriptor_1 = require("../reflect/ParameterDescriptor");
class ParameterDescriptorBuilder {
    constructor() { }
    build(methodName, annotationType, parameterIndex) {
        let paramDesc = new ParameterDescriptor_1.ParameterDescriptor();
        paramDesc.annotationType = annotationType;
        paramDesc.index = parameterIndex;
        paramDesc.methodName = methodName;
        return paramDesc;
    }
}
exports.ParameterDescriptorBuilder = ParameterDescriptorBuilder;
;
