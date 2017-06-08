import { createFakerObject } from '__tests__/utils';
import { IMovie, JSONAttributes as MovieAttributes, JSONSchema as MovieSchema } from 'Interfaces/models/Movie';
import { IDirector, JSONAttributes as DirectorAttributes, JSONSchema as DirectorSchema } from 'Interfaces/models/Director';
import { movieSchema } from 'schemas';
import { normalize } from 'normalizr';
import { IEntitiesState } from 'reducers/entities';

describe('IMovie', () => {
  it('stores the director\'s ID rather than the entire director', () => {
    const fakeDirector = createFakerObject<IDirector>(
      DirectorSchema, DirectorAttributes
    );
    const fakeMovie = createFakerObject<IMovie>(
      MovieSchema, MovieAttributes, { director: fakeDirector }
    );

    const normalized: { entities: IEntitiesState } = normalize(fakeMovie, movieSchema);
    const clientMovie = normalized.entities.movies[fakeMovie.id];

    console.log(clientMovie);

    expect(clientMovie.director).toEqual(fakeDirector.id);
  });
});
