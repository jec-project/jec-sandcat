"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("./SingletonErrorFactory");
class RootPathDescriptorUtil {
    constructor() {
        if (RootPathDescriptorUtil._locked || RootPathDescriptorUtil.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(RootPathDescriptorUtil);
        }
        RootPathDescriptorUtil._locked = true;
    }
    static getInstance() {
        if (RootPathDescriptorUtil.INSTANCE === null) {
            RootPathDescriptorUtil._locked = false;
            RootPathDescriptorUtil.INSTANCE = new RootPathDescriptorUtil();
        }
        return RootPathDescriptorUtil.INSTANCE;
    }
    decorate(rootPath, descriptor) {
        Object.defineProperty(rootPath, "__sandcatRootPathDescriptor", {
            enumerable: false,
            configurable: false,
            value: descriptor
        });
        Object.defineProperty(rootPath, "getRootPathDescriptor", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function () {
                return rootPath.__sandcatRootPathDescriptor;
            }
        });
    }
}
RootPathDescriptorUtil._locked = true;
RootPathDescriptorUtil.INSTANCE = null;
exports.RootPathDescriptorUtil = RootPathDescriptorUtil;
;
