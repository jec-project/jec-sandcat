"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceDescriptorRegistry {
    static registerDescriptor(resourceDescriptor) {
        ResourceDescriptorRegistry._resourceDescriptor = resourceDescriptor;
        if (resourceDescriptor) {
            ResourceDescriptorRegistry._parametersMap =
                new Map();
        }
        else
            ResourceDescriptorRegistry._parametersMap = null;
    }
    static getRegisteredDescriptor() {
        return ResourceDescriptorRegistry._resourceDescriptor;
    }
    static getParametersMap() {
        return ResourceDescriptorRegistry._parametersMap;
    }
}
ResourceDescriptorRegistry._resourceDescriptor = null;
ResourceDescriptorRegistry._parametersMap = null;
exports.ResourceDescriptorRegistry = ResourceDescriptorRegistry;
