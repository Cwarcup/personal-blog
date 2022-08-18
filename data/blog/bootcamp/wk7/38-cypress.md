---
title: End-to-End Testing with Cypress
date: '2022-08-17'
tags: ['Cypress', 'React', 'End-to-End Testing']
images: 'https://i.ytimg.com/vi/pJ349YntoIs/maxresdefault.jpg'
draft: false
summary: Cypress provides an amazing environment to simulate user interaction and verify results right in a running browser.
---

## Jest vs Cypress

- **Jest**
  - Command line test runner
  - Based around testing `assertions`
  - Used for **unit** and **integration** testing (mostly)
- **Cypress**
  - Runs its own browser to execute the tests in
  - Performs operations and interacts with the site the way that a user would (eg. typing into input fields, clicking on buttons)
  - Used for integration and **E2E** testing (mostly)

## Install and Configure Cypress

Cypress can be installed locally to the project (as a dev dependency) or globally on your OS.

Cypress docs recommend installing in a single project!

```bash
npm install -g cypress
npm install --save-dev cypress
npm install --save-dev cypress@9.7.0
```

- Use the `open` command to start Cypress running

```bash
# global installation
cypress open

# local installation
node_modules/.bin/cypress open
```

- Add a **script** to `package.json` for a quick way to start Cypress

```json
"cypress": "node_modules/.bin/cypress open"
```

```bash
npm run cypress
```

- We use the `cypress.json` file in the **main** directory to configure Cypress

```json
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280,
  "viewportHeight": 1200
}
```

- `baseUrl` tells Cypress where our application is **hosted** and what **port** it's listening on
- `viewportWidth` and `viewportHeight` specify the **dimensions** for Cypress' browser to use

Feel free to change the width and height values if developing for a mobile-first site

In your `package.json` file, add the following script to run Cypress tests:

```json
{
  "scripts": {
    "cypress:open": "cypress open"
  }
}
```

## Some Old Friends

- Cypress is built on top of Mocha and uses Chai **assertions**
- Cypress comes with **jQuery** installed (accessible with `Cypress.$();`)

## Cypress Basics

Once we get Cypress working, we only care about the folder called `cypress/integration`

- Cypress uses `spec` files to define tests

```js
describe('My First Test', () => {
  it('Does not do much', () => {
    expect(true).to.equal(true)
  })
})
```

- `describe` is a **test suite**
- `it` is a **test**
- `expect` is a **assertion**

Tests typically have the following structure:

```js
describe('My First Test', () => {
  it('Does not do much', () => {
    // 1. Arrange - setup initial app state
    // 2. Act - perform an action on the app (eg. click a button)
    // 3. Assert - verify the result of the action (eg. verify the page title)
  })
})
```

For example:

```js
describe('My First Test', () => {
  it('Does not do much', () => {
    // 1. Arrange - setup initial app state
    // - visit a page
    // - query for an element
    // 2. Act - perform an action on the app (eg. click a button)
    // - interact with that element (eg. type into an input field)
    // 3. Assert - verify the result of the action (eg. verify the page title)
    // - make an assertion about the page title
  })
})
```

We can access cypress commands by using the `cy` command

```js
describe('My First Test', () => {
  it('Does not do much', () => {
    cy.visit('/')
    cy.get('.navbar-brand').should('contain', 'My App')
  })
})
```

Another example:

```js
describe('My first Cypress tests', () => {
  it('true is true', () => {
    assert.equal(true, true)
  })

  it('can visit a web page', () => {
    cy.visit('https://example.cypress.io')

    cy.get('.nav-link').first().find('input').uncheck().should('not.be.checked')
  })
})
```

You can use the `beforeEach` to set up the app state before each test

```js
describe('My first Cypress tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('true is true', () => {
    assert.equal(true, true)
  })
  //...
})
```

In the configuration, we set the `baseUrl` to `http://localhost:8000`. We want Cypress to assume that all of our requests are made to our server by default.

**If we don't run our servers first**, then Cypress will complain so we should always look out for this message.

## Cypress Commands

Can add a 'backspace' command to Cypress to simulate a backspace key press

```js
cy.type('{backspace}')
```

## Saving a command as a variable

You may be doing some repetitive commands. You can save them as a variable and reuse them later.

```js
beforeEach(() => {
  cy.visit('/')
  cy.get('.search-input').find('input').as('searchInput')
})
```

To use this in your `it` block, you need to access the variable with `@`

```js
it('can search for a term', () => {
  cy.get('@searchInput').type('Cypress')
  cy.get('.search-button').click()
  cy.get('.search-results').should('contain', 'Cypress')
})
```

## Fixtures Data

- use the `intercept` [command](https://docs.cypress.io/api/commands/intercept) to intercept requests and return fixture data

```js
cy.intercept(method, url, staticResponse)
```

- We can import some static data into Cypress using the `fixture` command.
- static data must be in the `cypress/fixtures` folder

```js
beforeEach(() => {
  cy.visit('/').intercept('GET', '**/api/products', { fixture: 'products.json' }).as('products')
})
```

- use the `**` wildcard to match any url that starts with `/api/products`

We can ask Cypress to `wait` for the response like so:

```js
cy.wait('@products')
```

> See docs here on [wait](https://docs.cypress.io/api/commands/wait)

## Useful Links

- [Cypress Docs](https://docs.cypress.io/api/api/table-of-contents.html)
- [Cypress Best Practices (Official)](https://docs.cypress.io/guides/references/best-practices.html)
- [Cypress Cheat Sheet](https://cheatography.com/aiqbal/cheat-sheets/cypress-io/)

## Useful Cypress Links

- [Cypress Assertions](https://docs.cypress.io/guides/references/assertions#BDD-Assertions)
- [Default Assertions](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Default-Assertions)
- Cypress `should` [assertions](https://docs.cypress.io/api/commands/should#Usage)
- [Cypress selecting elements data-\*](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
- [Cypress async commands](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous)
- [Commands run serially](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions)
