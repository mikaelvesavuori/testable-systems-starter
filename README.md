# Testable Systems Starter

A sample project to use in testing workshops with the theme of testing and building "more testable" distributed (serverless) systems.

Relevant theoretical materials include:

- [Distributed Systems — Key Concepts & Patterns](https://engineering.klarna.com/distributed-systems-key-concepts-patterns-d4d5236b9816)
- [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)

Other good, practical material includes:

- [Understand Legacy Code](https://understandlegacycode.com) is great, see for example [A quick way to add tests when code has database or HTTP calls](https://understandlegacycode.com/blog/quick-way-to-add-tests-when-code-does-side-effects/)
- [You Don't Hate Mocks; You Hate Side-Effects](https://blog.thecodewhisperer.com/permalink/you-dont-hate-mocks-you-hate-side-effects)

_Based on the [minimalist-serverless-starter](https://github.com/mikaelvesavuori/minimalist-serverless-starter) project._

## Configurations

Configurations for ESLint and Prettier are reasonable starting points. The TypeScript config is very strict to get the most out of TS features. Serverless Framework is optimized ([ARM architecture](https://aws.amazon.com/blogs/aws/aws-lambda-functions-powered-by-aws-graviton2-processor-run-your-functions-on-arm-and-get-up-to-34-better-price-performance/); short log retention; no versioning), [CORS-activated](https://www.serverless.com/blog/cors-api-gateway-survival-guide/), and set to safer-than-default settings.

## Structure

The application starting point (the handler) is located at `src/handler.ts` and a first demonstrational test is at `tests/unit/demo.test.ts`. The rest of the tests and other "finished" materials are in the `__finished__` folder and might need updates to their import paths when you place them in the root again.

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

Using `npm start` you can start using the local endpoint `http://localhost:3000/greet` to call the service.

```bash
curl http://localhost:3000/greet
```

Which should respond back with:

```bash
"Hi there!"
```

---

## Workshop

The workshop is meant to be dynamic and interactive, but the below outlines an overall learning/experience flow for participants.

### Basics

#### New business requirement

> We need a service to greet people.

#### Concepts

- **Scope**
  - We use the concept generally, for a more extensive take see [What is in your Testing Scope?](https://medium.com/wix-engineering/what-is-in-your-testing-scope-8846714d4358)
- **Boundary**
  - See for example [Defining Test Boundaries – An example](https://www.simpleorientedarchitecture.com/defining-test-boundaries/) and [Avoid Test Duplication](https://martinfowler.com/articles/practical-test-pyramid.html#AvoidTestDuplication)
- **[Contra-variant testing](https://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html)**
- **[Determinism](https://martinfowler.com/articles/nonDeterminism.html)**

#### Present and discuss

- "Contra-variant testing": The benefits of testing the majority of code on a use-case level rather than per-function level.
- Confidence can be causated by determinism (in code) - determinism can be achieved by controlling side effects.

#### Steps

1. Look at `tests/unit/demo.test.ts` to familiarize yourself with the structure of a typical unit test.
2. Look at `src/handler.ts`. How can we test this? How might you think about the _scope_ of a given test - bigger, smaller and their pros/cons?
3. Implement a unit test on the entire handler. What do you foresee as issues with this solution?
4. Split out "business logic" from the handler. How is testing, reliability and confidence improved by doing this?
5. Reimplement the unit test on business logic, not on the handler.

---

### Dynamic input

#### New business requirement

> We need support for dynamic input/output, i.e. providing and responding with _**your**_ name.

#### Concepts

- **Mutability**
  - Read [Tiny Programming Principles: Immutability](https://www.tiny.cloud/blog/mutable-vs-immutable-javascript/) and [Immutable object](https://en.wikipedia.org/wiki/Immutable_object)
  - See also [To mutate or not – on Entities and Value Objects](https://www.schibsted.pl/blog/immutability-entities-and-value-objects/) and the approach in [Elegant Objects](https://www.elegantobjects.org)
- **Validation**
- **Invariant**
- **"Always valid" domain model**
  - Read [Always-Valid Domain Model](https://vkhorikov.medium.com/always-valid-domain-model-706e5f3d24b0), also covers the above concepts

#### Present and discuss

- The dangers of "dumb" [POCOs/POJOs](https://enterprisecraftsmanship.com/posts/dto-vs-value-object-vs-poco/) and mutability of data.
- Leverage prior logical validation if input remains unchanged/un-mutated.

#### Steps

6. Implement new functionality. How do we support both the new and old behaviors?
7. Think about validation: At which levels can/should we validate? Once, or across all boundaries? How could we be supported by using API-level schema validation? (See `api/Greeter.validator.json` for an example)
8. Implement validation functions. Demonstrate both structural/compositional ("functional") approach and object-oriented (DDD-inspired: value objects, Data Transfer Object, "always valid state") approach.
9. Implement any additional tests.

---

### Third-party dependency

#### New business requirement

> For "un-named" requests, we want to send back a response so it looks something like `Hi there, Luke Skywalker!`.

#### Concepts

- **[Observability](https://www.ibm.com/se-en/topics/observability)**

#### Present and discuss

- Testing vs monitoring and observability.
- Fallacies of distributed computing - What is it really that we want to test when we conduct integration testing?

#### Steps

10. How do we test an external service?
11. Getting test data and storing it co-located to our code and tests.
12. API response mocking using our test data. What about schema changes?
13. Handling errors and problem states correctly.
14. Implement tests.

Make sure to uncomment `setupFilesAfterEnv` in `jest.config.js` to get the mocking capability working.

---

### Handling persistence and other side effects

#### New business requirement

> We need to communicate each request to our service by emitting an event.

#### Concepts

- **Side effects**
  - Read the high-level [Side effect (computer science)](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>) and more practical [Side effects](https://dev.to/ruizb/side-effects-21fc)

#### Present and discuss

- How to test around boundaries of systems, especially when using managed products like message queues and databases.

#### Steps

15. Implement an event emitter (see `__finished__/src/infrastructure/emitter/Emitter.start.ts`). What problems do we get when using this for our testing?
16. Abstract the implementation into an interface and inject a dummy/mock/local variant for testing.
17. Making an implementation testable ("test aware") up until the point of producing potentially adverse side effects.
