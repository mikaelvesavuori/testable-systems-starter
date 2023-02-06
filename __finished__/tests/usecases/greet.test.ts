import { greet } from '../../src/usecases/greet_v1';

describe('Success cases', () => {
  test('It should greet the user', async () => {
    const expected = 'Hi there!';

    const response = greet();

    expect(response).toBe(expected);
  });
});
