import { Action } from 'redux';
import { combineReducers } from 'redux';
import { IMovie } from 'Interfaces/models/Movie';
import { MOVIES_REQUEST, MOVIES_SUCCESS } from 'actionTypes';
import { IMoviesAction } from '../actions';

// The single interface for the entire Redux store. This
// will simply consist of many 'child' interfaces
export interface IReduxStore {
  movies: IMoviesState;
}

interface IMoviesState {
  fetching: boolean;
  movies?: Array<IMovie>
}

// A Typescript 'type guard' to dynamically change the type of
// the given parameter if it satisifies a condition.
const actionIsAMovieAction = (action: Action): action is IMoviesAction => (
  action.type === MOVIES_REQUEST || action.type === MOVIES_SUCCESS
);

// The 'movies' reducer to process a request and response for
// movies. Note that the state is typesafe as is the action
// (using a type guard)
const movies = (
  state: IMoviesState = { fetching: false },
  action: Action | IMoviesAction
): IMoviesState => {
  if (!actionIsAMovieAction(action)) {
    return state;
  }

  const { type } = action;

  switch (type) {
    case MOVIES_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case MOVIES_SUCCESS:
      const movies = action.movies;
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
