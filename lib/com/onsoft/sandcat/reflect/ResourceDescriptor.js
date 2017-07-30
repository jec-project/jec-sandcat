"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceDescriptor {
    constructor() {
        this.urlPatterns = null;
        this.resourcePath = null;
        this.contextRoot = null;
        this.methodsMap = null;
        this.jsletMethodsMap = null;
        this.rootPathRefs = null;
        this.initObj();
    }
    initObj() {
        this.methodsMap = new Map();
        this.jsletMethodsMap = new Map();
    }
    addMethod(methodDescriptor) {
        this.methodsMap.set(methodDescriptor.name, methodDescriptor);
    }
    addJsletMethod(methodDescriptor) {
        this.jsletMethodsMap.set(methodDescriptor.jsletMethod, methodDescriptor);
    }
}
exports.ResourceDescriptor = ResourceDescriptor;
