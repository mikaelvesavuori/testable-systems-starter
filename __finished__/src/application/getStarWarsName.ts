import fetch from 'cross-fetch';

/**
 * @description Get a semi-random name of a Star Wars character using SWAPI.
 */
export async function getStarWarsName(endpointBase = 'https://swapi.dev/api/people') {
  try {
    const number = Math.ceil(Math.random() * 50);
    const response = await fetch(`${endpointBase}/${number}`).then((res: any) => res.json());
    return response.name;
  } catch (error: any) {
    const message = 'Error while integrating with the Star Wars API...';
    throw new Error(message);
  }
}

/*
export async function getStarWarsNameStart() {
  const number = Math.floor(Math.random() * 50); // <--- BUG, fix this
  const response = await fetch(`https://swapi.dev/api/people/${number}`).then((res: any) =>
    res.json()
  );
  return response.name;
}
*/
