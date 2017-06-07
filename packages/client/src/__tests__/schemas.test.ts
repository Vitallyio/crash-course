import { createFakerObject } from '__tests__/utils';
import { IDirector as IAPIDirector, JSONAttributes, JSONSchema } from 'Interfaces/models/Director';
import { directorSchema } from 'schemas';
import { normalize } from 'normalizr';
import { IEntitiesState } from 'reducers/entities';
import * as Moment from 'moment';

describe('IDirector', () => {
  it('turns the createdAt timestamp into a Moment', () => {
    const createdAt = Moment().subtract(1, 'day');
    const fakeDirector = createFakerObject<IAPIDirector>(
      JSONSchema, JSONAttributes, { createdAt: createdAt.toISOString() }
    );

    const normalized: { entities: IEntitiesState } = normalize(fakeDirector, directorSchema);
    const clientDirector = normalized.entities.directors[fakeDirector.id];

    console.log(clientDirector);

    expect(clientDirector.createdAtMoment instanceof Moment).toEqual(true);
    expect(clientDirector.createdAtMoment.format('YYYY-MM-DD')).toEqual(createdAt.format('YYYY-MM-DD'));
  });
});
