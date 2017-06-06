import { combineReducers } from 'redux';
import entities, { IEntitiesState } from './entities';
import moviesExplorer, { IMoviesExplorerState } from './movies';

export interface IReduxStore {
  moviesExplorer: IMoviesExplorerState;
  entities: IEntitiesState;
}

const rootReducer = combineReducers({
  moviesExplorer,
  entities
});

export default rootReducer;
