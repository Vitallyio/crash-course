import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from 'actionTypes';
import { movieSchema } from 'schemas';
import makeApiCall from './makeApiCall';
import { schema } from 'normalizr';
import { Dispatch, Action } from 'redux';

export interface IApiCallAction {
  type: string,
  response?: {
    entities: any,
    result: string | Array<string>
  },
  schema?: schema.Entity | [schema.Entity];
}

export const isApiCallAction = (action: Action): action is IApiCallAction => (
  Object.prototype.hasOwnProperty.call(action, 'schema')
);

export const loadMovies = () => (dispatch: Dispatch<IApiCallAction>) => (
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
