"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPattern = require("url-pattern");
class RouteDescriptor {
    constructor(pattern, mappedMethod, httpMethod) {
        this._pattern = null;
        this._rawPatternString = null;
        this._httpMethod = null;
        this._mappedMethod = null;
        this.initObj(pattern, mappedMethod, httpMethod);
    }
    initObj(pattern, mappedMethod, httpMethod) {
        this._pattern = new UrlPattern(pattern);
        this._rawPatternString = pattern;
        this._mappedMethod = mappedMethod;
        this._httpMethod = httpMethod;
    }
    getPatternString() {
        return this._rawPatternString;
    }
    getHttpMethod() {
        return this._httpMethod;
    }
    getMappedMethod() {
        return this._mappedMethod;
    }
    getUrlPattern() {
        return this._pattern;
    }
}
exports.RouteDescriptor = RouteDescriptor;
