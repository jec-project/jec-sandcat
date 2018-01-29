# JEC Sandcat Project: Update Release Notes

<a name="jec-sandcat-1.0.6"></a>
## **1.0.6** (2017-12-26)

### Bug Fixes

### Features

- Dependencies upgrade
- Adding implementation for the JEC container delegation API
- Fixing `jec-commons` module break changes
- Setting all logs to `LogLevel.DEBUG`

<a name="jec-sandcat-1.0.5"></a>
## **1.0.5** (2017-09-05)

### Bug Fixes

- **produces**: adding MIME type to response header when `MethodDescriptor.produces` property is not `null`
- **crossDomainPolicy**: adding support for the `HttpMethodParams.crossDomainPolicy` property
- **PropertyDescriptor**: fixing the correct value of the returned element in method decorators: using `descriptor` instead of `target`

### Features

- **ResourcePathDecorator**: adding support for the `ResourcePathParams` interface new members
- **RoutePathParams**: adding implementiion for the new `consumes`, `produces` and `crossDomainPolicy` members defined by the `RoutePathParams` interface
- **ResponseHandlerBuilder**: adding automatic error process to the HTTP response handler function
- Dependencies upgrade

<a name="jec-sandcat-1.0.4"></a>
## **1.0.4** (2017-08-28)

### Bug Fixes

- **SandcatError import**: fixing the `SandcatError` class import in the `SandcatAutowireProcessor`; `SandCatError` is not valid in linux environment

### Features

<a name="jec-sandcat-1.0.3"></a>
## **1.0.3** (2017-08-20)

### Bug Fixes

- **postinstall**: removing the post install script

### Features

- **dist**: adding binaries to the `dist` folder

<a name="jec-sandcat-1.0.2"></a>
## **1.0.2** (2017-08-20)

### Bug Fixes

### Features

- Fixing peer dependencies for GlassCat alpha releases integration

<a name="jec-sandcat-1.0.1"></a>
## **1.0.1** (2017-08-16)

### Bug Fixes

### Features

- **build**: adding build script to npm install process for GlassCat instal optimisation
- **index.ts**: refactoring index.ts file for better types generation
- Dependencies upgrade

<a name="jec-sandcat-1.0.0"></a>
## **1.0.0** (2017-08-02)

### Bug Fixes

### Features

- Initial release of the Sandcat framework