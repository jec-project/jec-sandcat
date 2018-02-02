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
const SandcatLocaleManager_1 = require("../i18n/SandcatLocaleManager");
const SandcatLoggerProxy_1 = require("../logging/SandcatLoggerProxy");
class SandcatResourceJsletProxy extends jec_exchange_1.HttpJslet {
    constructor() {
        super();
        this._resource = null;
        this._urlPatterns = null;
        this._name = null;
        this._handlerBuilder = null;
        this._urlPatternMapper = null;
        this._paramInjector = null;
        this._httpHeadersValidator = null;
        this.initObj();
    }
    initObj() {
        this._handlerBuilder = new ResponseHandlerBuilder_1.ResponseHandlerBuilder();
        this._paramInjector = new ParameterInjector_1.ParameterInjector();
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
        let descriptor = this._resource.getResourceDescriptor();
        let requestProperties = RequestPropertiesBuilder_1.RequestPropertiesBuilder.getInstance().build(httpMethod, req);
        let patternMatcher = this._urlPatternMapper.matchRequest(requestProperties);
        let parameters = null;
        let operationStatus = -1;
        let header = null;
        if (patternMatcher) {
            operation = descriptor.methodsMap
                .get(patternMatcher.descriptor.getMappedMethod());
        }
        if (operation) {
            header = descriptor.produces;
            if (header) {
                res.setHeader(jec_commons_1.HttpHeader.CONTENT_TYPE, header);
            }
            header = descriptor.crossDomainPolicy;
            if (header) {
                res.setHeader(jec_commons_1.HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, header);
            }
            operationStatus =
                this._httpHeadersValidator.validate(operation, requestProperties);
            if (operationStatus === jec_commons_1.HttpStatusCode.OK) {
                responseHandler = this._handlerBuilder.build(req, res, exit);
                parameters = this._paramInjector.buildParameters(patternMatcher, responseHandler, operation, req);
                action = operation.action;
                header = operation.produces;
                if (header) {
                    res.setHeader(jec_commons_1.HttpHeader.CONTENT_TYPE, header);
                }
                header = operation.crossDomainPolicy;
                if (header) {
                    res.setHeader(jec_commons_1.HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, header);
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
        let mapperBuilder = UrlPatternMapperBuilder_1.UrlPatternMapperBuilder.getInstance();
        let descriptor = resource.getResourceDescriptor();
        let resourceName = resource.constructor.name;
        let message = null;
        if (!descriptor) {
            message = SandcatLocaleManager_1.SandcatLocaleManager.getInstance()
                .get("errors.descriptor", resourceName);
            SandcatLoggerProxy_1.SandcatLoggerProxy.getInstance().log(message);
            throw new SandcatError_1.SandcatError(message);
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
