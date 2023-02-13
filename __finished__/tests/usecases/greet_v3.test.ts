import { Greeting } from '../../__finished__/src/domain/valueObjects/Greeting';

import { Emitter } from '../../__finished__/src/infrastructure/emitter/Emitter';

import { greet } from '../../__finished__/src/usecases/greet_v3';

describe('Success cases', () => {
  test('It should greet the user using a Star Wars name, if a name is not provided', async () => {
    const greeting = new Greeting();
    const emitter = new Emitter();
    const expected = 'Hi there, Luke Skywalker!';

    const response = await greet(greeting, emitter);

    expect(response).toBe(expected);
  });

  test('It should greet the user using a provided name', async () => {
    const name = `Stanislav`;
    const greeting = new Greeting({ queryStringParameters: { name } });
    const emitter = new Emitter();
    const expected = `Hi there, ${name}!`;

    const response = await greet(greeting, emitter);

    expect(response).toBe(expected);
  });
});
