import { greet } from './usecases/greet_v3';
import { Greeting } from './domain/valueObjects/Greeting';
import { Emitter } from './infrastructure/emitter/Emitter';

export const handler = async (event: Record<string, any>) => {
  try {
    return await handleSuccess(event);
  } catch (error: any) {
    return await handleFailure(error);
  }
};

async function handleSuccess(event: Record<string, any>) {
  const greeting = new Greeting(event);
  const emitter = new Emitter();
  const response = await greet(greeting, emitter);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}

async function handleFailure(error: any) {
  return {
    statusCode: 400,
    body: JSON.stringify(error.message)
  };
}
