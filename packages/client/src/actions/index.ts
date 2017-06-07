import { MOVIES_REQUEST, MOVIES_SUCCESS } from 'actionTypes';
import { IMovie } from 'Interfaces/models/Movie';
import { Action, Dispatch } from 'redux';

// Type 'type' for our Action to request and respond with
// movies. Note that we use Redux typings and extend them
// as need be
export interface IMoviesAction extends Action {
  movies?: Array<IMovie>;
}

export const loadMovies = () => (dispatch: Dispatch<IMoviesAction>) => {
  const dispatchMovieAction = (action: IMoviesAction) => (
    dispatch(action)
  );

  dispatchMovieAction({
    type: MOVIES_REQUEST
  });

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  };

  return fetch('http://localhost:5000/v1/movies', fetchOptions).then((response: Response) =>
    response.json().then((movies: Array<IMovie>) => {
      if (!response.ok) {
        // TODO: Display error
      }

      dispatchMovieAction({
        type: MOVIES_SUCCESS,
        movies
      });
    })
  );
};
