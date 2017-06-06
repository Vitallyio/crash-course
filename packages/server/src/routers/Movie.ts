import * as ejs from 'express';
import Movie from '../models/Movie';

export default function(router: ejs.Router) {

  router.get('/movies', async (req: ejs.Request, res: ejs.Response, next: ejs.NextFunction) => {
    try {
      const movies = await Movie
        .query()
        .eager('director');

      res.json(movies);
    } catch (err) {
      return next(err);
    }
  });
}
