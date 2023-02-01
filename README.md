# Testable Systems Starter

A sample project to use in testing workshops with the theme of testing and "more testable" systems.

_Based on the [minimalist-serverless-starter](https://github.com/mikaelvesavuori/minimalist-serverless-starter) project._

---

Just a sample minimalist starter to run a modern AWS-deployed serverless [TypeScript](https://www.typescriptlang.org) application with some quality-of-life tooling such as [ESLint](https://eslint.org) and [Prettier](https://prettier.io). Packages and deploys using [Serverless Framework](https://www.serverless.com) and bundles it using [esbuild](https://github.com/evanw/esbuild).

## Configurations

Configurations for ESLint and Prettier are reasonable starting points. The TypeScript config is very strict to get the most out of TS features. Serverless Framework is optimized ([ARM architecture](https://aws.amazon.com/blogs/aws/aws-lambda-functions-powered-by-aws-graviton2-processor-run-your-functions-on-arm-and-get-up-to-34-better-price-performance/); short log retention; no versioning), [CORS-activated](https://www.serverless.com/blog/cors-api-gateway-survival-guide/), and set to safer-than-default settings.

## Structure

The application starting point (the handler) is located at `src/handler.ts`. The tests and other "finished" materials are in the `__finished__` folder and might need updates to their import paths when you place them in the root again.

## Prerequisites

- Recent [Node.js](https://nodejs.org/en/) (ideally 18+) installed.
- Amazon Web Services (AWS) account with sufficient permissions so that you can deploy infrastructure. A naive but simple policy would be full rights for CloudWatch, Lambda, API Gateway, and S3.
- Ideally some experience with [Serverless Framework](https://www.serverless.com) as that's what we will use to deploy the service and infrastructure.

## Installation

Clone, fork, or download the repo as you normally would. Run `npm install`.

## Commands

- `npm start`: Run application locally
- `npm test`: Test the business/application logic with Jest
- `npm run build`: Package application with Serverless Framework
- `npm run deploy`: Deploy application to AWS with Serverless Framework
- `npm run teardown`: Remove stack from AWS

## Running locally

Using `npm start` you can start using the local endpoint `http://localhost:3000/dev/greet` to call the service.

```bash
curl http://localhost:3000/dev/greet
```

Which should respond back with:

```bash
"Hi there!"
```

---

## Workshop flow

The workshop is meant to be dynamic and interactive, but the below outlines an overall learning/experience flow for participants:

### Basics

1. Look at `tests/unit/start.test.ts` to familiarize audience with the structure of a typical unit test.
2. Look at `src/handler.ts`. How can we test this?
3. Implement unit test on entire handler.
4. Split out "business logic" from the handler. How is testing, reliability and confidence improved by doing this?
5. Implement unit test on business logic.

Present:

- "Contra-variant testing": The benefits of testing the majority of code on a use-case level rather than per-function level.
- Confidence can be causated by determinism (in code)

### Dynamic input

New business requirement: We need support for dynamic input, i.e. "your name".

7. Implement new functionality. How do we support both the new and old behaviors?
8. Implement validation functions. How could we be supported by using API-level schema validation?

Present:

- The dangers of POCOs/POJOs and mutability
- Zero trust - validate everywhere but don't be an idiot, leverage prior validation

9. Implement DTO function and domain object to represent valid state, plus any additional tests needs.

### Third-party dependency

New business requirement: For "un-named" requests, we want to send back a response like "Hi there, Luke Skywalker!".

10. How do we test an external service?
11. Getting test data and storing it co-located to our code and tests.
12. API response mocking using our test data. What about schema changes?
13. Handling errors and problem states correctly.
14. Implement tests.

Present:

- Testing vs monitoring and observability
- Fallacies of distributed computing - when does it matter to do integration testing?
