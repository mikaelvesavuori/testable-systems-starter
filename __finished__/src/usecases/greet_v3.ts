import { Greeting } from '../domain/valueObjects/Greeting';

import { getStarWarsName } from '../application/getStarWarsName';

import { EventEmitter } from '../interfaces/EventEmitter';

export async function greet(greeting: Greeting, emitter: EventEmitter): Promise<string> {
  const message = 'Hi there';
  const name = greeting.toDTO() || (await getStarWarsName());
  console.log('xxxx name', name);

  emitter.emit({
    busName: 'my-bus',
    message: 'I did this thing'
  });

  return `${message}, ${name}!`;
}
