import { Event } from './Event';

export interface EventEmitter {
  emit(event: Event): Promise<void>;
}
