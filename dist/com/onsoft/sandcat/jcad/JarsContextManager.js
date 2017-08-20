"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_jars_1 = require("jec-jars");
const SandcatConnector_1 = require("./connectors/SandcatConnector");
const CookieParamDecorator_1 = require("./decorators/CookieParamDecorator");
const CONNECTDecorator_1 = require("./decorators/CONNECTDecorator");
const DELETEDecorator_1 = require("./decorators/DELETEDecorator");
const DestroyDecorator_1 = require("./decorators/DestroyDecorator");
const ExitDecorator_1 = require("./decorators/ExitDecorator");
const GETDecorator_1 = require("./decorators/GETDecorator");
const HEADDecorator_1 = require("./decorators/HEADDecorator");
const InitDecorator_1 = require("./decorators/InitDecorator");
const OPTIONSDecorator_1 = require("./decorators/OPTIONSDecorator");
const PathParamDecorator_1 = require("./decorators/PathParamDecorator");
const POSTDecorator_1 = require("./decorators/POSTDecorator");
const PUTDecorator_1 = require("./decorators/PUTDecorator");
const QueryParamDecorator_1 = require("./decorators/QueryParamDecorator");
const RequestBodyDecorator_1 = require("./decorators/RequestBodyDecorator");
const RequestParamDecorator_1 = require("./decorators/RequestParamDecorator");
const ResourcePathDecorator_1 = require("./decorators/ResourcePathDecorator");
const RootPathDecorator_1 = require("./decorators/RootPathDecorator");
const RootPathRefsDecorator_1 = require("./decorators/RootPathRefsDecorator");
const TRACEDecorator_1 = require("./decorators/TRACEDecorator");
class JarsContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        let decorator = new decoratorClass();
        let connector = new SandcatConnector_1.SandcatConnector(jcadReference, decorator);
        ctxManager.addContext(jcadReference, this._jcadContext);
        connManager.addConnector(connector, this._jcadContext);
    }
    removeContext(jcadReference) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        connManager.removeConnector(jcadReference, this._jcadContext);
        ctxManager.removeContext(jcadReference);
    }
    createContext() {
        let ctxFactory = new jec_commons_1.JcadContextFactory();
        this._jcadContext = ctxFactory.create();
        this.initContext(jec_jars_1.JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF, CookieParamDecorator_1.CookieParamDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.CONNECT_CONNECTOR_REF, CONNECTDecorator_1.CONNECTDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.DELETE_CONNECTOR_REF, DELETEDecorator_1.DELETEDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.DESTROY_CONNECTOR_REF, DestroyDecorator_1.DestroyDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.EXIT_CONNECTOR_REF, ExitDecorator_1.ExitDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.GET_CONNECTOR_REF, GETDecorator_1.GETDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.HEAD_CONNECTOR_REF, HEADDecorator_1.HEADDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.INIT_CONNECTOR_REF, InitDecorator_1.InitDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.OPTIONS_CONNECTOR_REF, OPTIONSDecorator_1.OPTIONSDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF, PathParamDecorator_1.PathParamDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.POST_CONNECTOR_REF, POSTDecorator_1.POSTDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.PUT_CONNECTOR_REF, PUTDecorator_1.PUTDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF, QueryParamDecorator_1.QueryParamDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF, RequestBodyDecorator_1.RequestBodyDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF, RequestParamDecorator_1.RequestParamDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF, ResourcePathDecorator_1.ResourcePathDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF, RootPathDecorator_1.RootPathDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF, RootPathRefsDecorator_1.RootPathRefsDecorator);
        this.initContext(jec_jars_1.JarsConnectorRefs.TRACE_CONNECTOR_REF, TRACEDecorator_1.TRACEDecorator);
    }
    deleteContext() {
        this.removeContext(jec_jars_1.JarsConnectorRefs.COOKIE_PARAM_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.CONNECT_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.DELETE_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.DESTROY_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.EXIT_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.GET_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.HEAD_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.INIT_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.OPTIONS_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.PATH_PARAM_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.POST_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.PUT_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.QUERY_PARAM_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.REQUEST_BODY_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.REQUEST_PARAM_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.RESOURCE_PATH_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.ROOT_PATH_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.ROOT_PATH_REFS_CONNECTOR_REF);
        this.removeContext(jec_jars_1.JarsConnectorRefs.TRACE_CONNECTOR_REF);
        this._jcadContext = null;
    }
}
exports.JarsContextManager = JarsContextManager;
