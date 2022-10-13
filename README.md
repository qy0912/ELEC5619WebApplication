# ELEC5619

ELEC5619 plan your day repo

push test

## How to Download

- Clone the repo

## Download mysql

- Mac users: `brew install mysql`
- Open your terminal and type `mysql -u root -p`
- Create a schema by using `create database planday`
- Use this schema `USE planday`
- Insert Role Type
  `INSERT INTO roles(name) VALUES('USER');`
  `INSERT INTO roles(name) VALUES('ADMIN');`

## How to Run

- Go to `backend/src/main/resources/application.properties`
- Change `spring.datasource.password` to your own root password
- Build and run BackendApplication

## Test Using Swagger

http://localhost:8080/swagger-ui/index.html

Send request here
