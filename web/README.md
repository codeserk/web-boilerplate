# Web package

This package contains the web application, built using [Next.js](https://nextjs.org/), this package uses the `Frontend` package for all the shared code.

## Installation

Run this command to install the dependencies.

```bash
$ npm ci
```

## Development

First, run the development server:

```bash
$ npm run dev
```

Open [http://localhost:3012](http://localhost:3012) with your browser to see the result.

## Test

### Cypress

This project contains tests using [cypress](https://www.cypress.io/)
There are two ways of running these tests:

* With a dev env, using the latest changes before building. This is useful to implement tests while developing:

```bash
$ npm run e2e:dev
```

* With the application built. This is useful in a CI/CD pipeline, to test that the app is working correctly. This also runs in a headless chrome, so the steps won't be visible:
```bash
$ npm run build
$ npm run e2e
```

## Build

To build the app
```bash
$ npm run build
```

To generated static version
```bash
$ npm run export
```