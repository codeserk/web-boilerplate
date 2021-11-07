# Frontend common code

This package contains all the code that is going to be shared between all the frontend applications (web / mobile / desktop). This package is assuming all these frontends will use react.

## Client

This package is responsible for all the HTTP communication, apps will use the exposed stores for all the operations. HTTP client is auto-generated using [openapi-generator](https://github.com/OpenAPITools/openapi-generator).

## Modules

This package is divided into modules (`auth`, `entries`, `settings`). Each module can offer different interfaces, transformers, utils, and stores to interact with the referred entity (or concept).
