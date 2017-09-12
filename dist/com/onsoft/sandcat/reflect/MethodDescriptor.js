"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodDescriptor {
    constructor() {
        this.httpMethod = null;
        this.name = null;
        this.action = null;
        this.parameterNames = null;
        this.route = null;
        this.consumes = null;
        this.produces = null;
        this.crossDomainPolicy = null;
        this.urlPatterns = null;
        this.parametersMap = null;
        this.initObj();
    }
    initObj() {
        this.parametersMap = new Map();
    }
}
exports.MethodDescriptor = MethodDescriptor;
