import { GreetingInput } from '../interfaces/GreetingInput';

export function greet(name?: GreetingInput): string {
  const message = 'Hi there';

  if (name) return `${message}, ${name}`;

  return `${message}!`;
}
