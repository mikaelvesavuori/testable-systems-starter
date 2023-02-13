import { greet } from '../../__finished__/src/usecases/greet_v2';

describe('Success cases', () => {
  test('It should greet the user', async () => {
    const expected = 'Hi there!';

    const response = greet();

    expect(response).toBe(expected);
  });

  test('It should greet the user using a provided name', async () => {
    const name = `Hannah`;
    const expected = `Hi there, ${name}!`;

    const response = greet(name);

    expect(response).toBe(expected);
  });
});
