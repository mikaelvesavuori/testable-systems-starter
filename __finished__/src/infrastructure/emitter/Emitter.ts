import { EventEmitter } from '../../interfaces/EventEmitter';

export class Emitter implements EventEmitter {
  async emit(): Promise<void> {
    console.log('Using the real implementation of some event emitter');
  }
}
