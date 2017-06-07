import { schema } from 'normalizr';
import { IMovie as IAPIMovie } from 'Interfaces/models/Movie';
import { IDirector as IAPIDirector } from 'Interfaces/models/Director';
import IMovie from 'models/Movie';
import IDirector from 'models/Director';
import IBaseModel from 'models/Base';
import * as Moment from 'moment';

interface IAPIModel {
  createdAt: string;
}

const createBaseModel = <T extends IAPIModel>(apiObject: T): T & IBaseModel => {
  const baseModel: IBaseModel = {
    createdAtMoment: Moment(apiObject.createdAt)
  };

  return Object.assign({}, apiObject, baseModel);
};

const movieSchema = new schema.Entity('movies', {}, {
  processStrategy: (entity: IAPIMovie<string>): IMovie => (
    createBaseModel<IAPIMovie<string>>(entity)
  )
});

const directorSchema = new schema.Entity('directors', {}, {
  processStrategy: (entity: IAPIDirector): IDirector => ({
    ...createBaseModel<IAPIDirector>(entity),
    moviesCount: entity.movies ? entity.movies.length : 0
  })
});

movieSchema.define({
  director: directorSchema
});

directorSchema.define({
  movies: [movieSchema]
});

export {
  movieSchema,
  directorSchema
};
