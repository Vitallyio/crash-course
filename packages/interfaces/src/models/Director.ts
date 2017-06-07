import { IMovie } from './Movie';

export interface IDirector {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly movies?: Array<IMovie>;
}
