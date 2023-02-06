export const assertions: (AssertionGet | AssertionPost)[] = [
  {
    name: 'It should greet you',
    payload: {
      method: 'GET',
      path: 'greet'
    },
    is: 'Hi there!'
  } as AssertionGet,
  {
    name: 'It should greet you with a custom name',
    payload: {
      method: 'GET',
      path: 'greet?name=Someone'
    },
    is: 'Hi there, Someone!'
  } as AssertionGet
];

type Assertion = {
  name: string;
  payload: {
    method: 'GET' | 'POST';
    path: string;
    headers?: Record<string, any>;
  };
};

type AssertionGet = Assertion & {
  is: string;
};

type AssertionPost = Assertion & {
  schema: {
    type: JSONSchemaType;
    properties: {
      [key: string]: { type: JSONSchemaType };
    };
    required?: string[];
    additionalProperties: boolean;
  };
  body: Record<string, any>;
};

type JSONSchemaType = 'string' | 'number' | 'integer' | 'object' | 'array' | 'boolean' | 'null';
