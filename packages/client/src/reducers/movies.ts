import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from 'actionTypes';
import callApi, { IAPIState } from './callApi';
import { combineReducers } from 'redux';

export interface IMoviesState extends IAPIState {}

export interface IMoviesExplorerState {
  movies: IMoviesState;
}

const movies = callApi({
  request: MOVIES_REQUEST,
  success: MOVIES_SUCCESS,
  failure: MOVIES_FAILURE
});

export default combineReducers({
  movies
});
