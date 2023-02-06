export class Emitter {
  async emit(event: any): Promise<void> {
    console.log('Using the real implementation of some event emitter. The event is:', event);
  }
}
