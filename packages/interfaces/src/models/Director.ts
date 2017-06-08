import { IMovie } from './Movie';

export const JSONSchema = {
  id: '#director',

  type: 'object',

  properties: {
    id: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    name: {
      type: 'string',
      faker: 'name.findName'
    }
  },
  required: [
    'name'
  ]
};

export const JSONAttributes: Array<keyof IDirector> = ['id', 'createdAt', 'name'];

// An interface that matches the server's API response for a Director
export interface IDirector {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  readonly movies?: Array<IMovie>;
}
