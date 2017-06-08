import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from 'actionTypes';
import { movieSchema } from 'schemas';
import makeApiCall, { IApiCallAction } from './makeApiCall';

export const loadMovies = () => (dispatch: (action: IApiCallAction) => void) => (
  makeApiCall({
    endpoint: 'movies',
    schema: [movieSchema],
    types: {
      request: MOVIES_REQUEST,
      success: MOVIES_SUCCESS,
      failure: MOVIES_FAILURE
    },
    dispatch
  })
);
