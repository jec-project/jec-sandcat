"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteDescriptorUtil {
    constructor() { }
    match(descriptor, url, success, fail) {
        let result = descriptor.getUrlPattern().match(url);
        if (result)
            success(result);
        else
            fail();
    }
    test(descriptor, url) {
        return descriptor.getUrlPattern().match(url) ? true : false;
    }
    exec(descriptor, url) {
        return descriptor.getUrlPattern().match(url);
    }
}
exports.RouteDescriptorUtil = RouteDescriptorUtil;
