# JEC Sandcat Project

Sandcat is the standard implementation of the [JavaScript API for RESTful Services*(JARS)*][jec-jars-url]
specification for GlassCat JEC applications.

[![][jec-logo]][jec-url]

## Requirements

Sandcat needs the following system parameters in order to work correctly:

- Node 6+
- npm 3+
- TypeScript 2+

## Installation

Set up the Sandcat module with:

```bash
$ npm install jec-sandcat --save
```

## Sandcat Framework Initialization

You have to configure the Sandcat framework within a standard `Bootstrap` class
in order to detect JARS decorators:

```javascript
import {Bootstrap, BootstrapScript, JecContainer} from "jec-common";
import {SandcatBuilder} from "jec-sandcat";

@Bootstrap()
export class InitApp implements BootstrapScript {

  public run(container:JecContainer):void {
    new SandcatBuilder().build(container)
                        .process((err:any)=>{
                          if(err) {
                            throw new Error("Invalid JARS config: " + err);
                          }
                        });
  }
}
```

## Using JARS Decorators

All JARS decorators have to be imported with the ES6 syntax:

```javascript
import {ResourcePath, GET, Exit} from "jec-jars";

@ResourcePath("/hello")
export class Hello {

  @GET()
  public sayHelloWorld(@Exit exit:Function):void {
      exit("Hello World!");
  }
}
```

For a complete list of available decorators, please refer to the [JARS project][jec-jars-url].

## Running Tests

To execute all unit tests, use:

```bash
$ npm test
```

## API Reference

The API Reference documentation is not included into the Sandcat node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.
The online version of the  API reference documentation will be available soon at the JEC Website.

The documentation generator is [TypeDoc](http://typedoc.org/)

## Update Release Notes

**Current stable release:** [1.0.5](CHANGELOG.md#jec-sandcat-1.0.5)
 
For a complete listing of release notes for all Sandcat update releases, see the [CHANGELOG](CHANGELOG.md) file. 

## License
This Sandcat Project is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

```
Copyright 2016-2017 Pascal ECHEMANN.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[jec-url]: https://github.com/pechemann/JEC
[jec-jars-url]: https://github.com/pechemann/jec-jars
[jec-logo]: https://raw.githubusercontent.com/pechemann/JEC/master/assets/jec-logos/jec-logo.png