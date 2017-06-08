import { RelationMappings } from 'objection';
import Base from './Base';
import { IDirector } from 'Interfaces/models/Director';

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

  // Force the response to be an array of strings that match keys of a server Director -
  // e.g. the 'name' definition above
  getJsonAttributes(): Array<keyof this> {
    // This might seem duplicative, but here, we force the array to be keys defined
    // on the 'public' interface. This actually isn't duplicative though, as:
    // 1) The typing on the function return type ensures Base.$formatJson can
    //    simply 'pick' the value off the object/model
    // 2) The typing on this array ensures we also obey the interface that the client
    //    uses.
    const attributes: Array<keyof IDirector> = ['id', 'createdAt', 'name'];
    return attributes;
  }
}
