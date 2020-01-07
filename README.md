## Contents of this README file:

- Introduction
- Features Overview
- Installation

# Introduction

This repository is the version control system of the backend version of the Digital Class app.
This project uses Express server and Sequelize ORM.
It has been deployed on [Heroku](https://digitalclass-server.herokuapp.com/).

## Features Overview

With this RESTful API, a user can:

- Retrieve a list of classes, students and their evaluations
- Add and delete classes.
- Add evaluations to students
- Add, edit and remove students from a class

## Installation

1. Start a Postgres database in a docker container with the following command:

   ```
   $ docker run --rm -e POSTGRES_PASSWORD=pizza -p 5432:5432 postgres
   ```

To connect to the Database on a Mac you can use [Postico](https://eggerapps.at/postico/), on Linux - [DBeaver](https://dbeaver.io/)

2. Install the server and run it

   ```
   $ git clone
   $ cd ./digital-class-server
   $ npm install
   $ node . or nodemon .
   ```

3. Set up the front-end.

The repo including instructions can be found [here](https://github.com/dung-phan/digital-class-frontend).
