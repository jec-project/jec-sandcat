"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class RootPathSolver {
    constructor() { }
    buildVersionPath(version) {
        let versionPath = jec_commons_1.UrlStringsEnum.EMPTY_STRING;
        let prop = null;
        if (version) {
            prop = version.prefix;
            if (prop)
                versionPath += prop;
            prop = String(version.major);
            if (prop) {
                versionPath += prop;
                prop = String(version.minor);
                if (prop)
                    versionPath += jec_commons_1.UrlStringsEnum.DOT + prop;
            }
        }
        return versionPath;
    }
    resolvePath(params, descriptor) {
        const path = descriptor.path;
        const fixedPath = path.indexOf(jec_commons_1.UrlStringsEnum.SLASH) === 0 ?
            path : jec_commons_1.UrlStringsEnum.SLASH + path;
        let versionPath = null;
        descriptor.fullPath = fixedPath;
        versionPath = this.buildVersionPath(params.version);
        descriptor.fullPath += jec_commons_1.UrlStringsEnum.SLASH + versionPath;
    }
}
exports.RootPathSolver = RootPathSolver;
;
