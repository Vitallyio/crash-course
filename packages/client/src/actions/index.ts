import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from 'actionTypes';
import { movieSchema } from 'schemas';
import makeApiCall from './makeApiCall';
import { schema } from 'normalizr';

export interface IApiCallAction {
  type: string,
  response?: {
    entities: any,
    result: string | Array<string>
  },
  schema?: schema.Entity | [schema.Entity];
}

export const isApiCallAction = (action: any): action is IApiCallAction => (
  Object.prototype.hasOwnProperty.call(action, 'schema')
);

type DispatchFunction = (action: IApiCallAction) => void;

export const loadMovies = () => (dispatch: DispatchFunction) => (
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
