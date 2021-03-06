/*!
 * JEC Sandcat Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-sandcat" {

import * as UrlPattern from "url-pattern";
import { HttpRequest, HttpResponse, Jslet, HttpJslet } from "jec-exchange";
import { HttpMethodParams, RoutePathParams, RootPathVersion } from "jec-jars";
import { DomainContainer, DomainConnector } from "jec-glasscat-core";
import { FileProperties, FilePreProcessor, Decorator, AbstractLoggerProxy,
         AbstractDecoratorConnector, LoggerProxy, DelegatedContainerBuilder,
         DelegatedContainer, HttpMethod, HttpStatusCode } from "jec-commons";
import { LocaleManager } from "jec-commons-node";

export class AnnotationParamFactory {
    constructor();
    registerParam(propertyKey: string | symbol, parameterIndex: number, annotationType: AnnotationType): void;
}
export class JsletMethodDescriptorBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): JsletMethodDescriptorBuilder;
    build(jsletMethod: JsletMethod, key: string, descriptor: PropertyDescriptor): JsletMethodDescriptor;
}
export class MethodDescriptorBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): MethodDescriptorBuilder;
    build(httpMethod: HttpMethod, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): MethodDescriptor;
}
export class ParameterDescriptorBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ParameterDescriptorBuilder;
    build(methodName: string, annotationType: number, parameterIndex: AnnotationType): ParameterDescriptor;
}
export class RequestPropertiesBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): RequestPropertiesBuilder;
    build(httpMethod: HttpMethod, req: HttpRequest): RequestProperties;
}
export class ResponseHandlerBuilder {
    constructor();
    build(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): Function;
}
export class SandcatBuilder implements DelegatedContainerBuilder {
    constructor();
    build(container: DomainContainer): DelegatedContainer;
}
export class UrlPatternMapperBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): UrlPatternMapperBuilder;
    private buildRouteDescriptors(mapper, desc);
    build(descriptor: ResourceDescriptor): UrlPatternMapper;
}
export class DefaultSandcatContainer implements Sandcat {
    constructor();
    private _domainContainer;
    private _rootPathList;
    private initObj();
    private sendMessage(message, logLevel?);
    private initLocaleManager(container);
    getDomainContainer(): DomainContainer;
    setDomainContainer(container: DomainContainer): void;
    process(callback: (err: SandcatError) => void): void;
    addRootPath(rootPath: RootPathDescriptor): void;
    getRootPath(rootPathRef: string): RootPathDescriptor;
}
export class ResourceProxyJsletFactory {
    constructor();
    create(file: FileProperties, contextRoot: string, sandcatContainer: Sandcat): ResourceJsletProxy;
}
export class RootPathDescriptorFactory {
    constructor();
    private initObj();
    create(file: FileProperties): RootPathDescriptor;
}
export class SandcatAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly JARS_MASK;
    private static readonly RESOURCE_MASK;
    private static readonly API_MASK;
    private _resourceFiles;
    private _rootPathFiles;
    private _sandcatContainer;
    private _contextManager;
    private initObj();
    private transformResourceFiles(connector);
    private transformRootPathFiles();
    private validateCallbackHandler();
    processCompleteHandler: Function;
    setSandcatContainer(container: Sandcat): void;
    getSandcatContainer(): Sandcat;
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, connector: DomainConnector): void;
    processComplete(connector: DomainConnector, sourcePath: string): void;
}
export class UrlPatternMapper {
    constructor();
    private _routeDescMap;
    private _routeDescriptorUtil;
    private initObj();
    private getQueryParams(url);
    addRouteDescriptor(routeDescriptor: RouteDescriptor): void;
    hasRegisteredMethod(methodName: string): boolean;
    matchRequest(requestProperties: RequestProperties): UrlPatternMatcher;
}
export class UrlPatternMatcher {
    constructor();
    descriptor: RouteDescriptor;
    properties: any;
    queryParams: any;
}
export class SandcatError extends Error {
    constructor(message: string);
}
export class SandcatLocaleManager {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): LocaleManager;
}
export class SandcatConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class CONNECTDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class CookieParamDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class DELETEDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class DestroyDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor): any;
}
export class ExitDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class GETDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class HEADDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class InitDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor): any;
}
export class OPTIONSDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class PathParamDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class POSTDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class PUTDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class QueryParamDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class RequestBodyDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class RequestParamDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class ResourcePathDecorator implements Decorator {
    constructor();
    decorate(target: any, params: any): any;
}
export class RootPathDecorator implements Decorator {
    constructor();
    decorate(target: any, params: RoutePathParams): any;
}
export class RootPathRefsDecorator implements Decorator {
    constructor();
    decorate(target: any, pathRefs: string[]): any;
}
export class TRACEDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: HttpMethodParams): any;
}
export class JarsContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(): void;
    deleteContext(): void;
}
export interface ResourceJsletProxy extends Jslet {
    getResource(): any;
    setResource(resource: any): void;
}
export class SandcatResourceJsletProxy extends HttpJslet implements ResourceJsletProxy {
    constructor();
    private _resource;
    private _urlPatterns;
    private _name;
    private _handlerBuilder;
    private _urlPatternMapper;
    private _paramInjector;
    private _httpHeadersValidator;
    private initObj();
    private processJsletOperation(jsletMethod);
    private doNotFound(req, res, exit);
    private processOperation(httpMethod, req, res, exit);
    getResource(): any;
    setResource(resource: any): void;
    getUrlPatterns(): string[];
    getName(): string;
    init(): void;
    destroy(): void;
    before(): void;
    after(): void;
    doDelete(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doGet(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doOptions(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doTrace(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doHead(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doConnect(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doPut(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
    doPost(req: HttpRequest, res: HttpResponse, exit: (req: HttpRequest, res: HttpResponse, data: any) => void): void;
}
export class SandcatLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): LoggerProxy;
}
export class ResourceDescriptorRegistry {
    private static _resourceDescriptor;
    private static _parametersMap;
    static registerDescriptor(resourceDescriptor: ResourceDescriptor): any;
    static getRegisteredDescriptor(): ResourceDescriptor;
    static getParametersMap(): Map<string, Array<ParameterDescriptor>>;
}
export class RootPathDescriptorRegistry {
    private static _rootPathDescriptor;
    static registerDescriptor(rootPathDescriptor: RootPathDescriptor): any;
    static getRegisteredDescriptor(): RootPathDescriptor;
}
export enum AnnotationType {
    EXIT = 0,
    PATH_PARAM = 1,
    QUERY_PARAM = 2,
    HTTP_REQUEST = 3,
    REQUEST_BODY = 4,
    COOKIE_PARAM = 5,
    GET = 10,
    POST = 11,
    PUT = 12,
    DELETE = 13,
    CONNECT = 14,
    HEAD = 15,
    OPTIONS = 16,
    TRACE = 17,
}
export class BasicRootPathVersion implements RootPathVersion {
    constructor();
    major: number;
    minor: number;
    prefix: string;
}
export enum JsletMethod {
    INIT = 0,
    DESTROY = 1,
    BEFORE = 2,
    AFTER = 3,
}
export class JsletMethodDescriptor {
    constructor();
    jsletMethod: JsletMethod;
    name: string;
    action: Function;
}
export class MethodDescriptor {
    constructor();
    private initObj();
    httpMethod: HttpMethod;
    name: string;
    action: Function;
    parameterNames: string[];
    route: string;
    consumes: string;
    produces: string;
    crossDomainPolicy: string;
    urlPatterns: string[];
    parametersMap: Map<string, ParameterDescriptor>;
}
export class ParameterDescriptor {
    constructor();
    index: number;
    key: string;
    methodName: string;
    value: any;
    annotationType: AnnotationType;
}
export class ParameterInjector {
    constructor();
    buildParameters(matcher: UrlPatternMatcher, callbackHandler: Function, methodDescriptor: MethodDescriptor, req: HttpRequest): any[];
}
export class ResourceDescriptor {
    constructor();
    private initObj();
    urlPatterns: Array<string>;
    resourcePath: string;
    contextRoot: string;
    methodsMap: Map<string, MethodDescriptor>;
    jsletMethodsMap: Map<JsletMethod, JsletMethodDescriptor>;
    rootPathRefs: string[];
    consumes: string;
    produces: string;
    crossDomainPolicy: string;
    addMethod(methodDescriptor: MethodDescriptor): void;
    addJsletMethod(methodDescriptor: JsletMethodDescriptor): void;
}
export class RootPathDescriptor {
    constructor();
    path: string;
    fullPath: string;
    ref: string;
    version: RootPathVersion;
}
export class RouteDescriptor {
    constructor(pattern: string, mappedMethod: string, httpMethod: HttpMethod);
    private _pattern;
    private _rawPatternString;
    private _httpMethod;
    private _mappedMethod;
    private initObj(pattern, mappedMethod, httpMethod);
    getPatternString(): string;
    getHttpMethod(): HttpMethod;
    getMappedMethod(): string;
    getUrlPattern(): UrlPattern;
}
export interface Sandcat extends DelegatedContainer {
    setDomainContainer(container: DomainContainer): void;
    process(callback: (err: SandcatError) => void): void;
    addRootPath(rootPath: RootPathDescriptor): void;
    getRootPath(rootPathRef: string): RootPathDescriptor;
}
export class AnnotationTypeUtil {
    constructor();
    getParamStringRef(annotationType: AnnotationType): string;
    getMethodStringRef(annotationType: AnnotationType): string;
}
export class HttpHeadersValidator {
    constructor();
    private static readonly ALL_MIME_TYPES;
    validate(methodDesc: MethodDescriptor, requestProps: RequestProperties): HttpStatusCode;
}
export class ParametersMapUtil {
    static getParameterCollection(methodName: string): Array<ParameterDescriptor>;
}
export class RequestProperties {
    constructor();
    httpMethod: HttpMethod;
    acccept: string;
    contentType: string;
    subRoute: string;
}
export class ResourceDescriptorUtil {
    constructor(resource: any, descriptor: ResourceDescriptor, sandcatContainer: Sandcat);
    private _resource;
    private _descriptor;
    private _urlPatterns;
    private initObj(resource, descriptor, sandcatContainer);
    private fixParameterMethodDescriptors(descriptor);
    private initUrlPatterns(sandcatContainer);
    private setMethodUrlPatterns(contextRoot, desc);
    decorate(): void;
    fixCompositeValues(): void;
}
export class ResourcePathSolver {
    constructor();
    resolvePath(path: string, descriptor: ResourceDescriptor): void;
}
export class RootPathDescriptorUtil {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): RootPathDescriptorUtil;
    decorate(rootPath: any, descriptor: RootPathDescriptor): void;
}
export class RootPathSolver {
    constructor();
    private buildVersionPath(version);
    resolvePath(params: RoutePathParams, descriptor: RootPathDescriptor): void;
}
export class RouteDescriptorUtil {
    constructor();
    match(descriptor: RouteDescriptor, url: string, success: (result: any) => void, fail: () => void): void;
    test(descriptor: RouteDescriptor, url: string): boolean;
    exec(descriptor: RouteDescriptor, url: string): any;
}
export class SingletonErrorFactory {
    constructor();
    throw(contextClass: any): void;
}
}