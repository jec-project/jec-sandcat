"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const jec_jars_1 = require("jec-jars");
class RootPathRefsDecorator {
    constructor() { }
    decorate(target, pathRefs) {
        if (!pathRefs) {
            throw new jec_jars_1.JarsError("RootPathRefs error: 'pathRefs' parameter is missing for resource " +
                target);
        }
        let descriptor = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        descriptor.rootPathRefs = pathRefs;
        return target;
    }
}
exports.RootPathRefsDecorator = RootPathRefsDecorator;
