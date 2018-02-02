"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestProperties_1 = require("../utils/RequestProperties");
const jec_commons_1 = require("jec-commons");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class RequestPropertiesBuilder {
    constructor() {
        if (RequestPropertiesBuilder._locked || RequestPropertiesBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(RequestPropertiesBuilder);
        }
        RequestPropertiesBuilder._locked = true;
    }
    static getInstance() {
        if (RequestPropertiesBuilder.INSTANCE === null) {
            RequestPropertiesBuilder._locked = false;
            RequestPropertiesBuilder.INSTANCE = new RequestPropertiesBuilder();
        }
        return RequestPropertiesBuilder.INSTANCE;
    }
    build(httpMethod, req) {
        let props = new RequestProperties_1.RequestProperties();
        props.httpMethod = httpMethod;
        props.subRoute = req.getOriginalUrl();
        props.acccept = req.getHeader(jec_commons_1.HttpHeader.ACCEPT);
        props.contentType = req.getHeader(jec_commons_1.HttpHeader.CONTENT_TYPE);
        return props;
    }
}
RequestPropertiesBuilder._locked = true;
RequestPropertiesBuilder.INSTANCE = null;
exports.RequestPropertiesBuilder = RequestPropertiesBuilder;
;
