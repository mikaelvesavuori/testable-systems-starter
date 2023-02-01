import fetch from 'cross-fetch';

export async function getStarWarsName() {
  const response = await fetch(`https://swapi.dev/api/people/1`).then((res: any) => res.json());

  return response.name;
}
