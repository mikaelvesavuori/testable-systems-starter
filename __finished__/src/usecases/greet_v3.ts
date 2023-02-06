import { getStarWarsName } from '../application/getStarWarsName';

import { GreetingInput } from '../interfaces/GreetingInput';

export async function greet(name?: GreetingInput): Promise<string> {
  const message = 'Hi there';

  if (name) return `${message}, ${name}`;

  const starWarsName = await getStarWarsName();
  return `${message}, ${starWarsName}`;
}
