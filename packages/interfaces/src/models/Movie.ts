import { IDirector } from './Director';

export const JSONSchema = {
  id: '#movie',

  type: 'object',

  properties: {
    id: {
      type: 'string'
    },
    director_id: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    name: {
      type: 'string',
      faker: 'random.words'
    }
  },
  required: [
    'name',
    'director_id'
  ]
};

export const JSONAttributes: Array<keyof IMovie> = ['id', 'createdAt', 'name', 'director'];

export interface IMovie<T = IDirector> {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly director: T;
}
