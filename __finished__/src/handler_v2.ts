import { greet } from './usecases/greet_v2';

import { getDTO } from './application/getDTO';

export const handler = async (event: Record<string, any>) => {
  const name = getDTO(event);
  const response = greet(name);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
