"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const jec_jars_1 = require("jec-jars");
const SandcatLocaleManager_1 = require("../../i18n/SandcatLocaleManager");
class RootPathRefsDecorator {
    constructor() { }
    decorate(target, pathRefs) {
        const i18n = SandcatLocaleManager_1.SandcatLocaleManager.getInstance();
        let descriptor = null;
        if (!pathRefs) {
            throw new jec_jars_1.JarsError(i18n.get("errors.pathRefs", target));
        }
        descriptor = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        descriptor.rootPathRefs = pathRefs;
        return target;
    }
}
exports.RootPathRefsDecorator = RootPathRefsDecorator;
