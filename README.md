# BmcTest

We currently have two versions of the codebase

- The main branch uses localStorage to manage data information on the client side.
- The connectingToAPI branch implements an API stores data in a SQLite database on the server side.
- This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Two type of the project version

the [first version](#development-anguler-main-branch) is locate in the main branch and simple using Local Storage 

the [second version] ()

## Development Anguler main branch

To start a anguler server, run: ng serve
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

note: for tests, run [end-to-end tests](#running-end-to-end-tests) 

## Development Anguler connectingToAPI branch

To start a anguler server:
    - run the anguler: ng serve
    - and also run the bmc-test-backend: node server.js
        in bmc-test-backend we have tests using by postman

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
in this branch we have code that using API and SQLite database

## Running end-to-end tests

There are two types of E2E tests: the standard E2E test and an extended version.
To run a specific test (e.g., e2E_Tests.spec.ts), use:

    npx playwright test tests/e2E_Tests.spec.ts

You can also run both tests using a custom script (runTests.sh):

    ./runTests.sh

## Details on the application on the main

User data (e.g., registration, login) is stored in Local Storage.

In addition, for each signed-in user, their cart is saved using a key based on their email.
For example:

    cart__email: {his cart}
    cart__oreltwito3@gmail.com: [{"id":3,"quantity":4},{"id":2,"quantity":4}]

## Branch BonusTasks

Have 2 Lazy loading modules – One for Products & One for Cart

