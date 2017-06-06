import Base from '../packages/server/src/models/Base';
import Movie from '../packages/server/src/models/Movie';
import Director from '../packages/server/src/models/Director';
const knexConfig = require('../packages/server/knexfile');

Base.init(knexConfig.development);

const createSeedData = async () => {
  const paul = await Director
    .query()
    .insert({
      name: 'Paul Feig'
    });

  const drew = await Director
    .query()
    .insert({
      name: 'Drew Goddard'
    });

  const josh = await Director
    .query()
    .insert({
      name: 'Josh Whedon'
    });

  await Promise.all(
    ['Spy', 'Ghostbusters', 'The Heat'].map((movie) => (
      Movie
        .query()
        .insert({
          name: movie,
          director_id: paul.id
        })
    ))
  );

  await Promise.all(
    ['The Cabin in the Woods'].map((movie) => (
      Movie
        .query()
        .insert({
          name: movie,
          director_id: drew.id
        })
    ))
  );

  await Promise.all(
    ['Avengers: Age of Ultron', 'The Avengers', 'The Buffy Musical', 'Much Ado About Nothing'].map((movie) => (
      Movie
        .query()
        .insert({
          name: movie,
          director_id: josh.id
        })
    ))
  );
};

createSeedData().then(async () => {
  await Base.close();
  console.log('finished');
});
