import { IDirector } from './Director';

// An interface that matches the server's API response for a Movie
export interface IMovie<T = IDirector> {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly director: T;
}
