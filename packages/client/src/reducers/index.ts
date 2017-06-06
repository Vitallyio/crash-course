import { Action } from 'redux';
import { combineReducers } from 'redux';
import { IMovie } from 'Interfaces/models/Movie';
import { MOVIES_REQUEST, MOVIES_SUCCESS } from 'actionTypes';

export interface IReduxStore {
  movies: IMoviesState;
}

interface IMoviesState {
  fetching: boolean;
  movies?: Array<IMovie>
}

const movies = (
  state: IMoviesState = { fetching: false },
  action: Action
): IMoviesState => {
  const { type } = action;

  switch (type) {
    case MOVIES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case MOVIES_SUCCESS:
      const movies = (action as any).movies;
      return {
        ...state,
        movies,
        fetching: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies
});

export default rootReducer;
