const MIN_LENGTH = 2;
const MAX_LENGTH = 10;

export function validateName(input: string) {
  if (!input) return;
  const length = input.length;

  if (length < MIN_LENGTH) throw new Error('Too few characters in input!');
  if (length > MAX_LENGTH) throw new Error('Too many characters in input!');
}
