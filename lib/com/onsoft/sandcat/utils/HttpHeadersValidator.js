"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class HttpHeadersValidator {
    constructor() { }
    validate(methodDesc, requestProps) {
        let result = jec_commons_1.HttpStatusCode.OK;
        let methodProp = methodDesc.consumes;
        let requestProp = requestProps.contentType;
        if (methodProp && requestProp.indexOf(methodProp) === -1) {
            return jec_commons_1.HttpStatusCode.UNSUPPORTED_MEDIA_TYPE;
        }
        if (requestProp && requestProp !== HttpHeadersValidator.ALL_MIME_TYPES &&
            !methodProp) {
            return jec_commons_1.HttpStatusCode.NOT_ACCEPTABLE;
        }
        return result;
    }
}
HttpHeadersValidator.ALL_MIME_TYPES = "*/*";
exports.HttpHeadersValidator = HttpHeadersValidator;
;
