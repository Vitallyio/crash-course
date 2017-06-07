import Director from './Director';
import Base from './Base';
import { JSONSchema, JSONAttributes } from 'Interfaces/models/Movie';
import { RelationMappings } from 'objection';

export default class Movie extends Base {
  static tableName = 'movies';

  static jsonSchema = JSONSchema;

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
    return JSONAttributes;
  }
}
