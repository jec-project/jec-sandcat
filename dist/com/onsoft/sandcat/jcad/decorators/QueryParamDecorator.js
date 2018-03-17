"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotationParamFactory_1 = require("../../annotations/AnnotationParamFactory");
const AnnotationType_1 = require("../../reflect/AnnotationType");
class QueryParamDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex) {
        const factory = new AnnotationParamFactory_1.AnnotationParamFactory();
        factory.registerParam(propertyKey, parameterIndex, AnnotationType_1.AnnotationType.QUERY_PARAM);
        return target;
    }
}
exports.QueryParamDecorator = QueryParamDecorator;
