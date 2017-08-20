"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultSandcatContainer_1 = require("../core/DefaultSandcatContainer");
class SandcatBuilder {
    constructor() { }
    build(container) {
        let sandcat = new DefaultSandcatContainer_1.DefaultSandcatContainer();
        sandcat.setDomainContainer(container);
        return sandcat;
    }
}
exports.SandcatBuilder = SandcatBuilder;
;
