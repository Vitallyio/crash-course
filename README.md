# typescript-react-redux-monorepo

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
``cd`` into the ``server`` package and run ``knex migrate:latest``

Then, in the root folder, run ``yarn run seed``

## Starting the servers
### The back-end server
``cd`` into the ``server`` package and run ``yarn run start:watch``

You should now be able to visit ``http://localhost:5000/v1/movies`` and see a list of movies!

### The client server
``cd`` into the ``client`` package and run ``yarn run start``

A browser window should open that displays a list of 10 movies

## Overview
Branches
