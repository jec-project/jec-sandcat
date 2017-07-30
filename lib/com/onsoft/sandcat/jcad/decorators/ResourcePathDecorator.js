"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jars_1 = require("jec-jars");
const ResourceDescriptorRegistry_1 = require("../../metadata/ResourceDescriptorRegistry");
const ResourcePathSolver_1 = require("../../utils/ResourcePathSolver");
class ResourcePathDecorator {
    constructor() { }
    decorate(target, path) {
        if (!path) {
            throw new jec_jars_1.JarsError("ResourcePath error: 'path' parameter is missing for resource " +
                target);
        }
        let descriptor = ResourceDescriptorRegistry_1.ResourceDescriptorRegistry.getRegisteredDescriptor();
        let solver = new ResourcePathSolver_1.ResourcePathSolver();
        solver.resolvePath(path, descriptor);
        return target;
    }
}
exports.ResourcePathDecorator = ResourcePathDecorator;
