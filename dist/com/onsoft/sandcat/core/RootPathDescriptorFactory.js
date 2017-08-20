"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RootPathDescriptor_1 = require("../reflect/RootPathDescriptor");
const RootPathDescriptorRegistry_1 = require("../metadata/RootPathDescriptorRegistry");
const jec_commons_1 = require("jec-commons");
const RootPathDescriptorUtil_1 = require("../utils/RootPathDescriptorUtil");
class RootPathDescriptorFactory {
    constructor() { }
    initObj() { }
    create(file) {
        let pathDesc = new RootPathDescriptor_1.RootPathDescriptor();
        RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.registerDescriptor(pathDesc);
        let loader = new jec_commons_1.ClassLoader();
        let filePath = file.path + file.name + jec_commons_1.UrlStringsEnum.DOT + jec_commons_1.JecStringsEnum.JS_EXTENSION;
        let ConstObj = loader.loadClass(filePath);
        let rootPathObj = new ConstObj();
        let descriptorUtil = new RootPathDescriptorUtil_1.RootPathDescriptorUtil(rootPathObj, pathDesc);
        descriptorUtil.decorate();
        RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.registerDescriptor(null);
        return pathDesc;
    }
}
exports.RootPathDescriptorFactory = RootPathDescriptorFactory;
;
