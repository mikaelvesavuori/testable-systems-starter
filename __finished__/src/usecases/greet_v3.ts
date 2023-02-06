import { getStarWarsName } from '../application/getStarWarsName';

import { Greeting } from '../domain/valueObjects/Greeting';

export async function greet(greeting: Greeting): Promise<string> {
  const message = 'Hi there';
  const name = greeting.toDTO();

  if (name) return `${message}, ${name}`;

  const starWarsName = await getStarWarsName();
  return `${message}, ${starWarsName}`;
}
