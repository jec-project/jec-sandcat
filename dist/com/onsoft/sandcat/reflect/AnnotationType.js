"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnnotationType;
(function (AnnotationType) {
    AnnotationType[AnnotationType["EXIT"] = 0] = "EXIT";
    AnnotationType[AnnotationType["PATH_PARAM"] = 1] = "PATH_PARAM";
    AnnotationType[AnnotationType["QUERY_PARAM"] = 2] = "QUERY_PARAM";
    AnnotationType[AnnotationType["HTTP_REQUEST"] = 3] = "HTTP_REQUEST";
    AnnotationType[AnnotationType["REQUEST_BODY"] = 4] = "REQUEST_BODY";
    AnnotationType[AnnotationType["COOKIE_PARAM"] = 5] = "COOKIE_PARAM";
    AnnotationType[AnnotationType["GET"] = 10] = "GET";
    AnnotationType[AnnotationType["POST"] = 11] = "POST";
    AnnotationType[AnnotationType["PUT"] = 12] = "PUT";
    AnnotationType[AnnotationType["DELETE"] = 13] = "DELETE";
    AnnotationType[AnnotationType["CONNECT"] = 14] = "CONNECT";
    AnnotationType[AnnotationType["HEAD"] = 15] = "HEAD";
    AnnotationType[AnnotationType["OPTIONS"] = 16] = "OPTIONS";
    AnnotationType[AnnotationType["TRACE"] = 17] = "TRACE";
})(AnnotationType = exports.AnnotationType || (exports.AnnotationType = {}));
