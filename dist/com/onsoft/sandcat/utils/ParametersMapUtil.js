"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceDescriptorRegistry_1 = require("../metadata/ResourceDescriptorRegistry");
class ParametersMapUtil {
    static getParameterCollection(methodName) {
        const map = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getParametersMap();
        let result = null;
        if (map.has(methodName)) {
            result = map.get(methodName);
        }
        else {
            result = new Array();
            map.set(methodName, result);
        }
        return result;
    }
}
exports.ParametersMapUtil = ParametersMapUtil;
;
