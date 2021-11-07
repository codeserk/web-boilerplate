# Mobile application

This package contains the mobile application, built using [React Native](https://reactnative.dev/), this packages uses the `Frontend` package for all the shared code.

## Installation

Run this command to install the dependencies.

```bash
$ npm ci
```

## Development

First, run the development server:

```bash
$ npm run start
```

Then start the application in the device (or emulator) using the command for the platform
```bash
npm run android
# or
npm run ios
```

## Test

### Detox

This project contains tests using [Detox](https://github.com/wix/Detox)
A compiled version of the app is needed in order to run these tests. There are two ways of running these tests:

* With a dev env, using the latest changes before building. This is useful to implement tests while developing.

In order to make this work we need to build the debug app, start development server in e2e mode and run tests in debug mode:

```bash
# Run this in a second terminal, since it will stay alive
$ npm run start:e2e

$ npm run build:android:debug
$ npm run e2e:android:debug
```

* With the application built. This is useful in a CI/CD pipeline, to test that the app is working correctly.

With this approach, the app will not need the development server, since the code will be already compiled.

```bash
# Important to build the e2e version, to inject the fixtures
$ npm run build:android:e2e
$ npm run e2e:android
```

## Build

The app can be easily built for android using this command

```bash
$ npm run build:android
```