import { Event } from '../../interfaces/Event';
import { EventEmitter } from '../../interfaces/EventEmitter';

export class Emitter implements EventEmitter {
  async emit(event: Event): Promise<void> {
    console.log('Using the real implementation of some event emitter. The event is:', event);

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') console.log('Sending message...'); // Do actual event emitter logic and things if this is not in test
  }
}
