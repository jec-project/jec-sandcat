"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestProperties_1 = require("../utils/RequestProperties");
const jec_commons_1 = require("jec-commons");
class RequestPropertiesBuilder {
    constructor() { }
    build(httpMethod, req) {
        let props = new RequestProperties_1.RequestProperties();
        props.httpMethod = httpMethod;
        props.subRoute = req.getOriginalUrl();
        props.acccept = req.getHeader(jec_commons_1.HttpHeader.ACCEPT);
        props.contentType = req.getHeader(jec_commons_1.HttpHeader.CONTENT_TYPE);
        return props;
    }
}
exports.RequestPropertiesBuilder = RequestPropertiesBuilder;
;
