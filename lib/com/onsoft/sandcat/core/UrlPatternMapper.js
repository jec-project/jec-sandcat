"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const UrlPatternMatcher_1 = require("./UrlPatternMatcher");
const QueryString = require("qs");
const RouteDescriptorUtil_1 = require("../utils/RouteDescriptorUtil");
class UrlPatternMapper {
    constructor() {
        this._routeDescMap = null;
        this._routeDescriptorUtil = null;
        this.initObj();
    }
    initObj() {
        this._routeDescMap = new Map();
        this._routeDescriptorUtil = new RouteDescriptorUtil_1.RouteDescriptorUtil();
    }
    getQueryParams(url) {
        return QueryString.parse(url);
    }
    addRouteDescriptor(routeDescriptor) {
        let methodName = routeDescriptor.getHttpMethod();
        let coll = null;
        if (this._routeDescMap.has(methodName)) {
            coll = this._routeDescMap.get(methodName);
        }
        else {
            coll = new Array();
            this._routeDescMap.set(methodName, coll);
        }
        coll.push(routeDescriptor);
    }
    hasRegisteredMethod(methodName) {
        return this._routeDescMap.has(methodName);
    }
    matchRequest(requestProperties) {
        let htppMethod = requestProperties.httpMethod;
        let subRoute = requestProperties.subRoute;
        let matcher = null;
        let properties = null;
        let descriptor = null;
        let coll = null;
        let position = subRoute.indexOf(jec_commons_1.UrlStringsEnum.MARK);
        let subRoutePath = subRoute;
        let query = null;
        if (position !== -1) {
            subRoutePath = subRoute.substr(0, position);
            query = subRoute.substring(position + 1);
        }
        if (this._routeDescMap.has(htppMethod)) {
            coll = this._routeDescMap.get(htppMethod);
            position = coll.length;
            while (position--) {
                descriptor = coll[position];
                properties = this._routeDescriptorUtil.exec(descriptor, subRoutePath);
                if (properties) {
                    matcher = new UrlPatternMatcher_1.UrlPatternMatcher();
                    matcher.descriptor = descriptor;
                    matcher.properties = properties;
                    matcher.queryParams = this.getQueryParams(query);
                    break;
                }
            }
        }
        return matcher;
    }
}
exports.UrlPatternMapper = UrlPatternMapper;
