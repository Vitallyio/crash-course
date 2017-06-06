import { RelationMappings } from 'objection';
import Base from './Base';

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
}
