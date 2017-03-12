# Countable

[![Build Status](https://travis-ci.org/DavidLevayer/countable.svg?branch=develop)](https://travis-ci.org/DavidLevayer/countable)

1. [Overview](#overview)  
2. [Requierements](#requierements)
3. [Functionnalities](#functionnalities)  
4. [Main commands](#main-commands)  
5. [License](#license)
6. [Contributions](#contributions)

Additional documentation:

[Back-end full documentation](./docs/backend.md)

## Overview

Project status: :construction:**under development** :construction:.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24. It is mainly based on following technologies:

Backend:
* Typescript 2.x
* Express 4.x (restful api) and ts-express-decorators
* SQLite using sqlite3 module
* Mocha, Chai and mocha-typescript (unit tests)
* TSLint and CodeLyzer (code quality)

Frontend:
* Typescript 2.x
* Angular 2.3.x
* Jasmine and Karma (unit tests)
* TSLint and CodeLyzer (code quality)
* Webpack (build)

## Requierements

| Dependency | Version           |
|------------|-------------------|
| nodejs     | 6.9.5 or higher   |
| npm        | 3.10.10 or higher |

## Functionnalities

List of planned functionality:
- [x] Create and manage accounts
- [x] Create and manage categories
- [x] Create and manage subcategories
- [ ] Standard transactions (incomes/expenses)
- [ ] Account-to-account transactions
- [ ] Dashboard
- [ ] Statistic tools and graphics
- [ ] Multi-user application

List of developer features:
- [x] Continuous integration (Travis CI)
- [x] Frontend Unit tests
- [x] Frontend code coverage tool
- [x] Backend Unit tests
- [ ] Backend code coverage tool
- [ ] Integrate online code coverage tool
- [ ] End-to-end (e2e) tests
- [ ] Docker integration
- [ ] API Swagger

## Main commands

* `npm install` Install dependencies
* `npm start` Start both frontend and backend
* `npm run front` Start frontend
* `npm run server` Start backend
* `npm run build` Build the whole application
* `npm test` Start both frontend and backend unit tests
* `npm run front-test` Start frontend unit tests
* `npm run back-test` Start backend unit tests
* `npm run lint` Start linter

> :warning: On Windows, you may need to replace 'export' keywords by 'set'. Otherwise, commands like `npm start` or `npm test` 
may not work as expected.

## License

MIT

## Contributions

Any contribution or suggestion would be really appreciated. Do not hesitate to use the Issue section or to send a pull request.
