import { getStarWarsName } from '../application/getStarWarsName';
import { Greeting } from '../domain/valueObjects/Greeting';
import { EventEmitter } from '../interfaces/EventEmitter';

export async function greet(greeting: Greeting, emitter: EventEmitter): Promise<string> {
  const message = 'Hi there';
  const name = greeting.toDTO();

  emitter.emit({
    busName: 'my-bus',
    message: 'I did this thing'
  });

  if (name) return `${message}, ${name}`;

  const starWarsName = await getStarWarsName();
  return `${message}, ${starWarsName}`;
}
