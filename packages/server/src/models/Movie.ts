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

  // Force the response to be an array of strings that match keys of a server Director -
  // e.g. the 'name' definition above
  getJsonAttributes(): Array<keyof this> {
    // This might seem duplicative, but here, we force the array to be keys defined
    // on the 'public' interface. This actually isn't duplicative though, as:
    // 1) The typing on the function return type ensures Base.$formatJson can
    //    simply 'pick' the value off the object/model
    // 2) The typing on this array ensures we also obey the interface that the client
    //    uses.
    const attributes: Array<keyof IMovie> = ['id', 'createdAt', 'name', 'director'];
    return attributes;
  }
}
