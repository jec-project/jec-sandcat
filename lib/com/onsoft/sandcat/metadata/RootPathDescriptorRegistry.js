"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RootPathDescriptorRegistry {
    static registerDescriptor(rootPathDescriptor) {
        RootPathDescriptorRegistry._rootPathDescriptor = rootPathDescriptor;
    }
    static getRegisteredDescriptor() {
        return RootPathDescriptorRegistry._rootPathDescriptor;
    }
}
RootPathDescriptorRegistry._rootPathDescriptor = null;
exports.RootPathDescriptorRegistry = RootPathDescriptorRegistry;
