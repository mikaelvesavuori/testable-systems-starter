import { getStarWarsName } from '../../src/application/getStarWarsName';

describe('Success cases', () => {
  test('It should get a name from the Star Wars universe', async () => {
    const expected = 'Luke Skywalker';

    const response = await getStarWarsName();

    expect(response).toBe(expected);
  });
});

describe('Failure cases', () => {
  test('It should throw an error if TODO', async () => {
    await expect(async () => await getStarWarsName('https://fail')).rejects.toThrowError();
  });
});
