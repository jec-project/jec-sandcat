"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPatternMapper_1 = require("../core/UrlPatternMapper");
const RouteDescriptor_1 = require("../reflect/RouteDescriptor");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class UrlPatternMapperBuilder {
    constructor() {
        if (UrlPatternMapperBuilder._locked || UrlPatternMapperBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(UrlPatternMapperBuilder);
        }
        UrlPatternMapperBuilder._locked = true;
    }
    static getInstance() {
        if (UrlPatternMapperBuilder.INSTANCE === null) {
            UrlPatternMapperBuilder._locked = false;
            UrlPatternMapperBuilder.INSTANCE = new UrlPatternMapperBuilder();
        }
        return UrlPatternMapperBuilder.INSTANCE;
    }
    buildRouteDescriptors(mapper, desc) {
        let urlPatterns = desc.urlPatterns;
        let len = urlPatterns.length;
        let routeDesc = null;
        let name = desc.name;
        let httpMethod = desc.httpMethod;
        while (len--) {
            routeDesc = new RouteDescriptor_1.RouteDescriptor(urlPatterns[len], name, httpMethod);
            mapper.addRouteDescriptor(routeDesc);
        }
    }
    build(descriptor) {
        let mapper = new UrlPatternMapper_1.UrlPatternMapper();
        let routeDescriptor = null;
        let methodsMap = descriptor.methodsMap;
        methodsMap.forEach((value, key, map) => {
            this.buildRouteDescriptors(mapper, value);
        });
        return mapper;
    }
}
UrlPatternMapperBuilder._locked = true;
UrlPatternMapperBuilder.INSTANCE = null;
exports.UrlPatternMapperBuilder = UrlPatternMapperBuilder;
;
