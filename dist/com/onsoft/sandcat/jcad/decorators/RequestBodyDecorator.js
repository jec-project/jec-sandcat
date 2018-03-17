"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotationParamFactory_1 = require("../../annotations/AnnotationParamFactory");
const AnnotationType_1 = require("../../reflect/AnnotationType");
class RequestBodyDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex) {
        const factory = new AnnotationParamFactory_1.AnnotationParamFactory();
        factory.registerParam(propertyKey, parameterIndex, AnnotationType_1.AnnotationType.REQUEST_BODY);
        return target;
    }
}
exports.RequestBodyDecorator = RequestBodyDecorator;
