import { RelationMappings } from 'objection';
import Base from './Base';
import { JSONSchema, JSONAttributes } from 'Interfaces/models/Director';
import Movie from './Movie';

export default class Director extends Base {
  static tableName = 'directors';

  static jsonSchema = JSONSchema;

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
    return JSONAttributes;
  }
}
