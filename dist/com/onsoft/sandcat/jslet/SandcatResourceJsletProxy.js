"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const jec_commons_1 = require("jec-commons");
const ResponseHandlerBuilder_1 = require("../builders/ResponseHandlerBuilder");
const UrlPatternMapperBuilder_1 = require("../builders/UrlPatternMapperBuilder");
const ParameterInjector_1 = require("../reflect/ParameterInjector");
const SandcatError_1 = require("../exceptions/SandcatError");
const JsletMethod_1 = require("../reflect/JsletMethod");
const RequestPropertiesBuilder_1 = require("../builders/RequestPropertiesBuilder");
const HttpHeadersValidator_1 = require("../utils/HttpHeadersValidator");
class SandcatResourceJsletProxy extends jec_exchange_1.HttpJslet {
    constructor() {
        super();
        this._resource = null;
        this._urlPatterns = null;
        this._name = null;
        this._handlerBuilder = null;
        this._urlPatternMapper = null;
        this._paramInjector = null;
        this._requestPropertiesBuilder = null;
        this._httpHeadersValidator = null;
        this.initObj();
    }
    initObj() {
        this._handlerBuilder = new ResponseHandlerBuilder_1.ResponseHandlerBuilder();
        this._paramInjector = new ParameterInjector_1.ParameterInjector();
        this._requestPropertiesBuilder = new RequestPropertiesBuilder_1.RequestPropertiesBuilder();
        this._httpHeadersValidator = new HttpHeadersValidator_1.HttpHeadersValidator();
    }
    processJsletOperation(jsletMethod) {
        let action = null;
        let operation = this._resource.getResourceDescriptor()
            .jsletMethodsMap
            .get(jsletMethod);
        if (operation) {
            action = operation.action;
            action.apply(this._resource);
        }
    }
    doNotFound(req, res, exit) {
        exit(req, res.sendStatus(jec_commons_1.HttpStatusCode.NOT_FOUND), null);
    }
    processOperation(httpMethod, req, res, exit) {
        let action = null;
        let responseHandler = null;
        let operation = null;
        let requestProperties = this._requestPropertiesBuilder.build(httpMethod, req);
        let patternMatcher = this._urlPatternMapper.matchRequest(requestProperties);
        let parameters = null;
        let operationStatus = -1;
        let responseMime = null;
        if (patternMatcher) {
            operation =
                this._resource.getResourceDescriptor()
                    .methodsMap
                    .get(patternMatcher.descriptor.getMappedMethod());
        }
        if (operation) {
            operationStatus =
                this._httpHeadersValidator.validate(operation, requestProperties);
            if (operationStatus === jec_commons_1.HttpStatusCode.OK) {
                responseHandler = this._handlerBuilder.build(req, res, exit);
                parameters = this._paramInjector.buildParameters(patternMatcher, responseHandler, operation, req);
                action = operation.action;
                responseMime = operation.produces;
                if (responseMime) {
                    res.setHeader(jec_commons_1.HttpHeader.CONTENT_TYPE, responseMime);
                }
                action.apply(this._resource, parameters);
            }
            else {
                exit(req, res.sendStatus(operationStatus), null);
            }
        }
        else {
            this.doNotFound(req, res, exit);
        }
    }
    getResource() {
        return this._resource;
    }
    setResource(resource) {
        let mapperBuilder = new UrlPatternMapperBuilder_1.UrlPatternMapperBuilder();
        let descriptor = resource.getResourceDescriptor();
        let resourceName = resource.constructor.name;
        if (!descriptor) {
            throw new SandcatError_1.SandcatError("No ResourceDescriptor is defined for the specified resource:" +
                resourceName);
        }
        this._resource = resource;
        this._name = resourceName;
        this._urlPatterns = descriptor.urlPatterns;
        this._urlPatternMapper = mapperBuilder.build(descriptor);
    }
    getUrlPatterns() {
        return this._urlPatterns;
    }
    getName() {
        return this._name;
    }
    init() {
        this.processJsletOperation(JsletMethod_1.JsletMethod.INIT);
    }
    destroy() {
        this.processJsletOperation(JsletMethod_1.JsletMethod.DESTROY);
    }
    before() {
        this.processJsletOperation(JsletMethod_1.JsletMethod.BEFORE);
    }
    after() {
        this.processJsletOperation(JsletMethod_1.JsletMethod.AFTER);
    }
    doDelete(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.DELETE, req, res, exit);
    }
    doGet(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.GET, req, res, exit);
    }
    doOptions(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.OPTIONS, req, res, exit);
    }
    doTrace(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.TRACE, req, res, exit);
    }
    doHead(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.HEAD, req, res, exit);
    }
    doConnect(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.CONNECT, req, res, exit);
    }
    doPut(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.PUT, req, res, exit);
    }
    doPost(req, res, exit) {
        this.processOperation(jec_commons_1.HttpMethod.POST, req, res, exit);
    }
}
exports.SandcatResourceJsletProxy = SandcatResourceJsletProxy;