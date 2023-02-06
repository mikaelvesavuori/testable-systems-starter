import { EventEmitter } from '../../interfaces/EventEmitter';

export class LocalEmitter implements EventEmitter {
  async emit(): Promise<void> {
    console.log('Using the local/mock implementation of some event emitter');
  }
}
