# Sigalei Backend Test

This is a backend application for the hiring test from company [Sigalei](https://www.sigalei.com.br/).

Here we use data from GitHub API GraphQL. The objective is to create an web application that shows the ranking of the main contributors to the Linux project.

The ideia is that the application gives insights/rankings to answer these questions:

- Who were the users who most commit in Linux repository in 2020;
- Who were the users who most add lines in the Linux repository project in 2020;
- Who were the users who most removed lines from the Linux repository project in 2020;

## - Specifications and technologies used here

This project was built using `Nodejs` with `Typescript`.

Here, `node` version is `12.16.3` and the package manager used is `yarn` in version `1.22.5`.

The database used is `Postgres` with `Typeorm` as ORM (object-relational mapping). Besides that, the database is running in a `docker` image of postgres.

In tests, it's used `Jest` and `Coverage` reports to help.

To test the APIs it was used [`Insomnia`](https://insomnia.rest/) and [`DBeaver - v:7.2.1`](https://dbeaver.io/) as a database administration tool.

The archtecture of the project is based in DDD (Domain Driven Design).

## - How to run the project

### Docker

First of all, it's needed to install docker and download the postgres image. To install docker I suggest following instructions in this [link](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2#c7e37c6a26584d33b20cf332f2bdb31d).

After the instalation of docker, we need to create the database container with the correct image. [Here](https://hub.docker.com/_/postgres) you can see the docs of how to download the latest image from Postgres, but here's my suggestion to create the container and downloading image. It's important to follow the `password` and `ports` configuration as they are here. It's better to follow the command in terminal:
```
docker run --name sigalei -e POSTGRES_PASSWORD=docker -p 5436:5432 -d postgres
```
After creating the container and downloading image, run to check if everything is ok:
```
docker ps
```
### DBeaver

To visualize the database with Dbeaver, open it and click:
- New database connection
- Postgres

A window will open with tab `Main`. There you should set:
- Host: localhost
- Port: 5436
- Database: postgres
- Username: postgres
- Password: docker

In tab `PostgresQL`:
- Show all database: `check the box`

### Project

After downloading the code from the repository (and letting the docker running), run `yarn` to install all the dependencies.

After that, we need to create the tables in database, so run:
```
yarn typeorm migration:run
```
After that, to finish, run:
```
yarn dev:server
```
A message like this should appear in terminal:
```
🤑️ Server started on port 3334!
```
If so, enjoy the application!

### Testing the API
