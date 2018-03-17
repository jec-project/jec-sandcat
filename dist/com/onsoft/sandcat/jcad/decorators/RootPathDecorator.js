"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RootPathDescriptorRegistry_1 = require("../../metadata/RootPathDescriptorRegistry");
const jec_jars_1 = require("jec-jars");
const RootPathSolver_1 = require("../../utils/RootPathSolver");
const SandcatLocaleManager_1 = require("../../i18n/SandcatLocaleManager");
class RootPathDecorator {
    constructor() { }
    decorate(target, params) {
        const i18n = SandcatLocaleManager_1.SandcatLocaleManager.getInstance();
        let descriptor = null;
        let solver = null;
        if (!params) {
            throw new jec_jars_1.JarsError(i18n.get("errors.params", target));
        }
        descriptor = RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.getRegisteredDescriptor();
        descriptor.path = params.path;
        descriptor.ref = params.ref;
        descriptor.version = params.version;
        solver = new RootPathSolver_1.RootPathSolver();
        solver.resolvePath(params, descriptor);
        return target;
    }
}
exports.RootPathDecorator = RootPathDecorator;
