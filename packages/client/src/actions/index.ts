import { MOVIES_REQUEST, MOVIES_SUCCESS } from 'actionTypes';
import { IMovie } from 'Interfaces/models/Movie';

export const loadMovies = () => (dispatch: any) => {
  dispatch({
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

      dispatch({
        type: MOVIES_SUCCESS,
        movies
      });
    })
  );
};
