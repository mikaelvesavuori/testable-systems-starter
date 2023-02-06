import { greet } from './usecases/greet';

export const handler = async () => {
  const response = await greet();

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
