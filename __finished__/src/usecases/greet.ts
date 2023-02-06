import { getStarWarsName } from '../getStarWarsName';

export async function greet() {
  return await getStarWarsName();
}
