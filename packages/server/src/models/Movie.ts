import Director from './Director';
import Base from './Base';
import { IMovie } from 'Interfaces/models/Movie';
import { RelationMappings } from 'objection';

export default class Movie extends Base {
  static tableName = 'movies';

  static jsonSchema = {
    id: '#director',

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

  static relationMappings: RelationMappings = {
    director: {
      relation: Base.BelongsToOneRelation,
      modelClass: __dirname + '/Director',
      join: {
        from: 'movies.director_id',
        to: 'directors.id'
      }
    }
  };

  name: string;
  director_id: string;
  readonly director: Director;

  getJsonAttributes(): Array<keyof this> {
    const attributes: Array<keyof IMovie> = ['id', 'createdAt', 'name', 'director'];
    return attributes;
  }
}
