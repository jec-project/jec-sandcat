"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParametersMapUtil_1 = require("../utils/ParametersMapUtil");
const ParameterDescriptorBuilder_1 = require("../builders/ParameterDescriptorBuilder");
class AnnotationParamFactory {
    constructor() { }
    registerParam(propertyKey, parameterIndex, annotationType) {
        const methodName = propertyKey.toString();
        const paramDesc = ParameterDescriptorBuilder_1.ParameterDescriptorBuilder.getInstance().build(methodName, annotationType, parameterIndex);
        ParametersMapUtil_1.ParametersMapUtil.getParameterCollection(methodName).push(paramDesc);
    }
}
exports.AnnotationParamFactory = AnnotationParamFactory;
