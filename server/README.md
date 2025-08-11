# Backend - Online Watch Store

This is the Spring Boot backend for the Online Watch Store project.

## Prerequisites

- Java 17 or higher installed
- Maven installed
- MariaDB (or any SQL database) running and configured
- `.env` or environment variables set for database connection and admin credentials

# Configure environment variables
The .env should be created at the root of the backend folder (server). So the path should be `/server/.env`
The spring boot expects following environment variables:
```bash
DB_URL=jdbc:your_database_url   
DB_USERNAME=root # change username according to your setup if root does not work
DB_PASSWORD=your_database_password

JWT_SECRET_KEY=256_bits_key_is_recommended

ADMIN_EMAIL=any_email_works
ADMIN_USERNAME="huge_loser"
ADMIN_PASSWORD=make_sure_you_remember_it
```

> [!Note]
> These values can be passed directly in the application.properties as well. 
> Visit the application.properties file to see how the environment variables are being used.

The environment variables does not automatically get configured by the Spring Boot. We need to configure them manually so that they are called and used on runtime. It is done in [EnvConfig.java](./src/main/java/com/watchstore/server/config/EnvConfig.java).

## Setup

1. **Install dependencies and build:**

```bash
mvn clean install
```
> [!IMPORTANT]
> If you see testing error fails while doing mvn clean install, build it by skipping the test.

## To skip test
```bash
mvn clean install -DskipTests
```

If everything was configured properly the application should build without any error.

2. **Run the backend:**

```bash
mvn spring-boot:run
```
The backend server will start on the port 5000. You can change the port via [application.properties](./src/main/resources/application.properties)

# NOTES

- The database schema is initialised from [schema.sql](./src/main/resources/schema.sql). It is done by Spring Boot itself with these properties:
```bash
spring.sql.init.mode=always
spring.sql.init.schema.locations=classpath:schema.sql
```
in application.properties

- Make sure your database connection URL starts with jdbc: otherwise the app will fail to start.

- JWT is used for authentication and authorization.

The backend tries to follow REST API pattern. However, it is not perfect. As it was a learning project, it is fine.
Here's the general structure

##### config
Contains configuration beans and setup (e.g., reading .env, security configs).

##### controller
REST endpoints that process requests from the frontend and return JSON responses and/or Http status codes.

##### dto
Defines what data is accepted from the client and what is sent back (prevents exposing internal models directly).

##### exceptions
Contains custom exceptions and global exception handling for cleaner controllers.

##### repository
JPA interfaces for interacting with the database without writing raw SQL.

##### service
Contains the main application logic (validation, authorization checks, database operations).

##### startup
Runs initialization tasks when the app starts (e.g., creating admin if none exists).

##### util
Helper methods/classes used across multiple layers.
