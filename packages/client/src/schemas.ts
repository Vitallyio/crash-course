import { schema } from 'normalizr';

const movieSchema = new schema.Entity('movies', {});
const directorSchema = new schema.Entity('directors', {});

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
