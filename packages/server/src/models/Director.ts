import { RelationMappings } from 'objection';
import Base from './Base';
import { IDirector } from 'Interfaces/models/Director';
import Movie from './Movie';

export default class Director extends Base {
  static tableName = 'directors';

  static jsonSchema = {
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

  static relationMappings: RelationMappings = {
    movies: {
      relation: Base.HasManyRelation,
      modelClass: __dirname + '/Movie',
      join: {
        from: 'directors.id',
        to: 'movies.director_id'
      }
    }
  };

  name: string;
  readonly movies?: Array<Movie>;

  getJsonAttributes(): Array<keyof this> {
    const attributes: Array<keyof IDirector> = ['id', 'createdAt', 'name'];
    return attributes;
  }
}
