import { IMovie } from 'Interfaces/models/Movie';
import { IDirector } from 'Interfaces/models/Director';
import { mergeWith, isArray } from 'lodash';
import { isApiCallAction, IApiCallAction } from 'actions/makeApiCall';
import { Action } from 'redux';

export interface IEntitiesState {
  movies: { [id: string]: IMovie };
  directors: { [id: string]: IDirector };
}

export const initialState: IEntitiesState = {
  movies: {},
  directors: {}
};

// Updates an entity cache in response to any action with response.entities.
export default (
  state = initialState,
  action: IApiCallAction | Action
): IEntitiesState => {
  if (isApiCallAction(action) && action.response) {
    // Here, we override Lodash's default behavior to merge arrays by simply replacing
    // the new value with the old one.
    return mergeWith({}, state, action.response.entities, ((objValue: any, srcValue: any) => {
      if (isArray(objValue)) {
        return srcValue;
      }
    }));
  }

  return state;
};
