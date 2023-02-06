import { greet } from './usecases/greet_v1';

export const handler = async () => {
  const response = greet();

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
