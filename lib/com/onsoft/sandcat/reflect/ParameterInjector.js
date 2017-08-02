"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotationType_1 = require("./AnnotationType");
const SandcatError_1 = require("../exceptions/SandcatError");
class ParameterInjector {
    constructor() { }
    buildParameters(matcher, callbackHandler, methodDescriptor, req) {
        let map = methodDescriptor.parametersMap;
        let parameters = new Array(map.size);
        let annotationType = -1;
        let index = -1;
        map.forEach((value, key, map) => {
            annotationType = value.annotationType;
            index = value.index;
            if (annotationType === AnnotationType_1.AnnotationType.EXIT) {
                parameters[index] = callbackHandler;
            }
            else if (annotationType === AnnotationType_1.AnnotationType.PATH_PARAM) {
                parameters[index] = matcher.properties[value.key];
            }
            else if (annotationType === AnnotationType_1.AnnotationType.HTTP_REQUEST) {
                parameters[index] = req;
            }
            else if (annotationType === AnnotationType_1.AnnotationType.QUERY_PARAM) {
                parameters[index] = matcher.queryParams[value.key];
            }
            else if (annotationType === AnnotationType_1.AnnotationType.REQUEST_BODY) {
                parameters[index] = req.getBody();
            }
            else if (annotationType === AnnotationType_1.AnnotationType.COOKIE_PARAM) {
                parameters[index] = req.getCookies()[value.key];
            }
            else {
                throw new SandcatError_1.SandcatError(`Invalid annotation type: ${annotationType} while an AnnotationType value is expected`);
            }
        });
        return parameters;
    }
}
exports.ParameterInjector = ParameterInjector;
