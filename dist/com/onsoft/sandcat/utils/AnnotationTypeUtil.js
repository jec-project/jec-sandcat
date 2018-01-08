"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotationType_1 = require("../reflect/AnnotationType");
class AnnotationTypeUtil {
    constructor() { }
    getParamStringRef(annotationType) {
        let result = null;
        if (annotationType === AnnotationType_1.AnnotationType.EXIT) {
            result = "AnnotationType.EXIT";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.PATH_PARAM) {
            result = "AnnotationType.PATH_PARAM";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.HTTP_REQUEST) {
            result = "AnnotationType.HTTP_REQUEST";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.QUERY_PARAM) {
            result = "AnnotationType.QUERY_PARAM";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.REQUEST_BODY) {
            result = "AnnotationType.REQUEST_BODY";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.COOKIE_PARAM) {
            result = "AnnotationType.COOKIE_PARAM";
        }
        return result;
    }
    getMethodStringRef(annotationType) {
        let result = null;
        if (annotationType === AnnotationType_1.AnnotationType.GET) {
            result = "AnnotationType.GET";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.POST) {
            result = "AnnotationType.POST";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.PUT) {
            result = "AnnotationType.PUT";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.DELETE) {
            result = "AnnotationType.DELETE";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.CONNECT) {
            result = "AnnotationType.CONNECT";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.HEAD) {
            result = "AnnotationType.HEAD";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.OPTIONS) {
            result = "AnnotationType.OPTIONS";
        }
        else if (annotationType === AnnotationType_1.AnnotationType.TRACE) {
            result = "AnnotationType.TRACE";
        }
        return result;
    }
}
exports.AnnotationTypeUtil = AnnotationTypeUtil;
;
