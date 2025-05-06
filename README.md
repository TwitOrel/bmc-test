# BmcTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run: ng serve

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Running end-to-end tests

There are two types of E2E tests: the standard E2E test and an extended version.
To run a specific test (e.g., e2E_Tests.spec.ts), use:

    npx playwright test tests/e2E_Tests.spec.ts

You can also run both tests using a custom script (runTests.sh):

    ./runTests.sh

## Details on the application

User data (e.g., registration, login) is stored in Local Storage.

In addition, for each signed-in user, their cart is saved using a key based on their email.
For example:

    cart__email: {his cart}
    cart__oreltwito3@gmail.com: [{"id":3,"quantity":4},{"id":2,"quantity":4}]

## Branch BonusTasks

Have 2 Lazy loading modules – One for Products & One for Cart


TODO~~~ create simple server side
