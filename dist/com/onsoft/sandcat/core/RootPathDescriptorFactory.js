"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RootPathDescriptor_1 = require("../reflect/RootPathDescriptor");
const RootPathDescriptorRegistry_1 = require("../metadata/RootPathDescriptorRegistry");
const jec_commons_1 = require("jec-commons");
const RootPathDescriptorUtil_1 = require("../utils/RootPathDescriptorUtil");
const path = require("path");
class RootPathDescriptorFactory {
    constructor() { }
    initObj() { }
    create(file) {
        const pathDesc = new RootPathDescriptor_1.RootPathDescriptor();
        RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.registerDescriptor(pathDesc);
        const filePath = path.join(file.path, file.name + jec_commons_1.UrlStringsEnum.DOT + jec_commons_1.JecStringsEnum.JS_EXTENSION);
        const ConstObj = jec_commons_1.GlobalClassLoader.getInstance().loadClass(filePath);
        const rootPathObj = new ConstObj();
        RootPathDescriptorUtil_1.RootPathDescriptorUtil.getInstance().decorate(rootPathObj, pathDesc);
        RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.registerDescriptor(null);
        return pathDesc;
    }
}
exports.RootPathDescriptorFactory = RootPathDescriptorFactory;
;
