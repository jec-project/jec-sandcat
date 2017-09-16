"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RootPathDescriptorUtil {
    constructor(rootPath, descriptor) {
        this._rootPath = null;
        this._descriptor = null;
        this.initObj(rootPath, descriptor);
    }
    initObj(rootPath, descriptor) {
        this._rootPath = rootPath;
        this._descriptor = descriptor;
    }
    decorate() {
        let rootPath = this._rootPath;
        Object.defineProperty(rootPath, "__sandcatRootPathDescriptor", {
            enumerable: false,
            configurable: false,
            value: this._descriptor
        });
        Object.defineProperty(this._rootPath, "getRootPathDescriptor", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function () {
                return rootPath.__sandcatRootPathDescriptor;
            }
        });
    }
}
exports.RootPathDescriptorUtil = RootPathDescriptorUtil;
;
