"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class ResourcePathSolver {
    constructor() { }
    resolvePath(path, descriptor) {
        let fixedPath = path.indexOf(jec_commons_1.UrlStringsEnum.SLASH) === 0 ?
            path : jec_commons_1.UrlStringsEnum.SLASH + path;
        descriptor.resourcePath = fixedPath;
    }
}
exports.ResourcePathSolver = ResourcePathSolver;
;
