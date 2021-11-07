# Codeserk's Web Boilerplate

This repository contains a boilerplate for a web application.
It contains 4 main blocks:

* [Backend](./backend): The backend project using NestJS
* [Frontend](./frontend): The frontend project, containing all the common code that can be shared by all the frontend apps.
* [Web](./web): The web application, using Next.js framework.
* [Mobile](./mobile): The mobile application, using React Native.

## Dependencies

This project uses `MongoDB` to store all the diary entries and users. In order to make this run, ensure mongo it's up and running on port `27019`. The easiest way of doing this is starting the docker container:

```bash
$ docker-compose up
```
