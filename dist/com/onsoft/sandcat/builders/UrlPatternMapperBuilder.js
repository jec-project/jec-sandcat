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
        const urlPatterns = desc.urlPatterns;
        const name = desc.name;
        const httpMethod = desc.httpMethod;
        let len = urlPatterns.length;
        let routeDesc = null;
        while (len--) {
            routeDesc = new RouteDescriptor_1.RouteDescriptor(urlPatterns[len], name, httpMethod);
            mapper.addRouteDescriptor(routeDesc);
        }
    }
    build(descriptor) {
        const mapper = new UrlPatternMapper_1.UrlPatternMapper();
        const methodsMap = descriptor.methodsMap;
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
