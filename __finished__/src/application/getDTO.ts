import { GreetingInput } from '../interfaces/GreetingInput';
import { validateName } from '../frameworks/validateName';

/**
 * @description Trivial, minimal way of return an expected Data Transfer Object from an input.
 *
 * Note that in this case it's actually just a string, not an object, but the idea is the same.
 */
export function getDTO(event: Record<string, any>): GreetingInput {
  const name = event?.queryStringParameters?.name || '';
  validateName(name);
  return name;
}
