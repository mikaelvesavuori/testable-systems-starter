export const assertions = [
  {
    name: 'It should greet you',
    payload: {
      method: 'GET',
      path: 'greet'
    },
    is: 'Hi there!'
  }
];
