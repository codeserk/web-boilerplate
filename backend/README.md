# Backend application

This is the backend side of this boilerplate. It's a NodeJS application that uses [Nest](https://github.com/nestjs/nest) framework.
This application is responsible for

* Authenticating users using credentials and JWTs
* Storing Diary entries from the user (CRUD)
* Retrieving some statistics from the diary entries (for admins)


## API

The API follows RESTful guidelines. When the app is running, there will be a Swagger UI exposed to easily discover the endpoints [here](http://localhost:3011/docs). These docs can also be used to generate clients in any language. It's used by the module `Frontend` to generate a client in TS using `axios`.

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

This project contains unit and e2e tests.
* Unit tests are used to cover some util functions
* e2e tests are used to cover endpoints. In this boilerplate there are a few tests to show how an endpoint can be tested, integrating with a mongodb in-memory.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:all
```
