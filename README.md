# Crash Course
A crash course in using Typescript and a monorepo to ensure full-stack type safety (Backend: Node, Frontend: React + Redux)

## Setup
### Create databases
We are using Postgres, so you'll need to create the databases and user specified in ``packages/server/knexfile.js``

```SQL
CREATE USER sa
  WITH PASSWORD 'sa' SUPERUSER;

CREATE DATABASE typescript_react_redux_monorepo_development
  WITH ENCODING='UTF8'
    OWNER=postgres
    LC_COLLATE='en_US.UTF-8'
    LC_CTYPE='en_US.UTF-8'
    CONNECTION LIMIT=-1;

CREATE DATABASE typescript_react_redux_monorepo_test
  WITH ENCODING='UTF8'
    OWNER=postgres
    LC_COLLATE='en_US.UTF-8'
    LC_CTYPE='en_US.UTF-8'
    CONNECTION LIMIT=-1;
```

### Install dependencies
Install yarn

```
npm install -g yarn
```

Install dependencies. You can ``cd`` into each package and run ``yarn`` individually, or you can simply run the helpful script ``yarn run installAll`` at the root to install all dependencies with one command.

### Migrate & seed database
``cd`` into the ``server`` package and run ``yarn run migrate``

Then, in the root folder, run ``yarn run seed``

## Starting the servers
### The back-end server
``cd`` into the ``server`` package and run ``yarn run start:watch``

You should now be able to visit ``http://localhost:5000/v1/movies`` and see a list of movies!

### The client server
``cd`` into the ``client`` package and run ``yarn run start``

A browser window should open that displays a list of 10 movies

## Overview
This repo provides a crash course in achieving a scalable, (almost) production-ready full-stack typesafe monorepo with Typescript, Node, React, and Redux. This is achieved through the iterations made in the [pull requests](https://github.com/Vitallyio/crash-course/pulls). Here is an overview of each branch/PR.

### Master
The master branch is very, very basic. It simply has a Node backend and a React frontend. Each uses Typescript, but the frontend simply hardcodes interfaces for the server data it receives.

### PR #1 - Monorepo + client & server shared interfaces
As a first step, we need to setup an ``interfaces`` package to contain interfaces the server's API responses will abide by. The server uses these interfaces to ensure the API abides by them, and the client uses them to access/display the server data in a typesafe way.

### PR #2 - Typesafe Redux
Here, we add Redux to the mix, ensuring that are Actions, Reducers, and ``connect``ed are typesafe while still leveraging the shared interfaces.

### PR #3 - Scalable Typesafe Redux
This builds off of PR #2 by using [normalizr](https://github.com/paularmstrong/normalizr) to normalize API responses into a flat, key-based data store in Redux. We also create reusable ways to send API calls with a generic Action and to respond to those Actions (and the API's response) with a generic Reducer.

### PR #4 - Testing - Creating (fake) server data in the client
This takes the shared ``interfaces`` package to the next level by leveraging [JSON schemas](json-schema.org) to both validate a model on the server and to generate full, interface-compliant fake instances of our server models on the client. This is illustrated via a simple test.

### PR #5 - Client models
This is simply an experiment in setting up client models that extend the shared interface but add client-only functionality to our normalized data.
