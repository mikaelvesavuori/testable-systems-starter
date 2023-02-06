/**
 * @description Example of a simple value object which will ensure it can only be in a correct state.
 */
export class Greeting {
  name: string;

  constructor(event: Record<string, any>) {
    this.fromDTO(event);
  }

  public fromDTO(event: Record<string, any>) {
    const name = event?.queryStringParameters?.name;
    if (!name) throw new Error('Missing "name" in query string parameters!');
    this.name = name;
  }

  public toDTO() {
    return this.name;
  }
}
