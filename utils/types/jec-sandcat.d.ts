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

/*PLACEHOLDER*/}