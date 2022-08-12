---
title: Automated Testing
date: '2022-08-13'
tags: ['Automated Testing', 'React']
images: 'https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/ThinkstockPhotos-490920800_0.jpg?itok=kQbb2T29'
draft: false
summary: Various methods for automating testing.
---

## Static Testing

- Very little maintenance required.
- example:
  - [ESLint](https://eslint.org/)
  - static type checking
  - [TypeScript](https://www.typescriptlang.org/)

## Unit Testing

- Test a specific function or component in isolation
- We focus on one small, predictable piece of code to increase our confidence that it will work as expected.
  - Similar to Storybook, we can use the `@storybook/addon-storyshots` plugin to test our components.
- Examples:
  - Jest

## Integration Testing

- The process of proving that two or more units of code work together

## End-to-End Testing (E2E)

- Most expensive testing strategy
- Goal is to get as close to simulated user behaviour as possible
- Can use [Cypress](https://www.cypress.io/) to test the entire application

## Test Driven Development (TDD)

- Goal is to write tests first, then write code that passes the tests

Rules:

1. Write new code only if an automated test has failed
2. Eliminate duplication

It can be an excellent technique for new developers because it encourages the understanding of the requirements before we write a single line of application code.

### Red, Green, Refactor (RGR)

We can call the process we use during test-driven development "Red, Green, Refactor":

1. Red - Write a small test that doesn't pass.
1. Green - Do the minimal amount of work to make the test pass.
1. Refactor - Improve the code, continuing to ensure all tests still pass.

---

- Start by exporting a function that returns `null`
- Import this into your test file
  - `describe('MyFunction", () => {...)`
    - add the `it`/`test` function:
    - `it('should return null', () => {...})`
    - start to write the test
