import { IDirector } from './Director';

export interface IMovie<T = IDirector> {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly director: T;
}
