# Storefront Project by Bassel Ashraf

## Create User

CREATE USER bassel WITH PASSWORD 'helloworld';

## Create the following databases:

CREATE DATABASE basel;
CREATE DATABASE test;

## Grant privileges to databases

GRANT ALL PRIVILEGES ON DATABASE basel TO bassel;

## Add env file

fill the .env file with the following data:
POSTGRES_HOST
POSTGRES_DB
POSTGRES_TEST_DB
POSTGRES_USER
POSTGRES_PASSWORD
ENV
BYCRYPT_PASSWORD
SALTROUNDS
SECRET_TOKEN

## Install packages in package.json file

Run the following command:
npm install

## Run migrations to create the tables of the database

Run the following command:
db-migrate up

## Testing

run the following command:
npm run test

## Running the server

run the following command:
npm run start
