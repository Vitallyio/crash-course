import { IDirector } from './Director';

export interface IMovie {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly director: IDirector;
}
