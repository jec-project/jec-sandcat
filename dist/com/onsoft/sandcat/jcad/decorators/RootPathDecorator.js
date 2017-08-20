"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RootPathDescriptorRegistry_1 = require("../../metadata/RootPathDescriptorRegistry");
const jec_jars_1 = require("jec-jars");
const RootPathSolver_1 = require("../../utils/RootPathSolver");
class RootPathDecorator {
    constructor() { }
    decorate(target, params) {
        if (!params) {
            throw new jec_jars_1.JarsError("RootPath error: 'params' parameter is missing for resource API " +
                target);
        }
        let descriptor = RootPathDescriptorRegistry_1.RootPathDescriptorRegistry.getRegisteredDescriptor();
        descriptor.path = params.path;
        descriptor.ref = params.ref;
        descriptor.version = params.version;
        let solver = new RootPathSolver_1.RootPathSolver();
        solver.resolvePath(params, descriptor);
        return target;
    }
}
exports.RootPathDecorator = RootPathDecorator;
