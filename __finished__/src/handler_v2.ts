import { greet } from '../__finished__/src/usecases/greet_v1';
import { getDTO } from '../__finished__/src/application/getDTO';

export const handler = async (event: Record<string, any>) => {
  const name = getDTO(event);
  const response = greet(name);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
