import { Event } from '../../interfaces/Event';
import { EventEmitter } from '../../interfaces/EventEmitter';

export class LocalEmitter implements EventEmitter {
  async emit(event: Event): Promise<void> {
    console.log('Using the local/mock implementation of some event emitter. The event is:', event);
  }
}
