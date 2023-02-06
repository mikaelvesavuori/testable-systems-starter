import { greet } from '../__finished__/src/usecases/greet_v2';

import { Greeting } from '../__finished__/src/domain/valueObjects/Greeting';

export const handler = async (event: Record<string, any>) => {
  const greeting = new Greeting(event);
  const response = greet(greeting.toDTO());

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
