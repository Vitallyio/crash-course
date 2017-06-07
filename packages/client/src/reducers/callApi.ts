import { Action } from 'redux';
import { isApiCallAction, IApiCallAction } from 'actions';

export interface IAPIState {
  isInitiallyLoaded: boolean;
  isFetching: boolean;
  response?: { result: string | Array<string> };
  errorCode?: number;
}

export const initialState: IAPIState = {
  isInitiallyLoaded: false,
  isFetching: false,
  response: undefined
};

const callApi = (
  { request, success, failure }: IApiCallActionTypes
) => {
  return (
    state = initialState,
    action: Action | IApiCallAction
  ): IAPIState => {
    const { type } = action;

    if ([request, success, failure].indexOf(type) < 0) {
      return state;
    }

    // Maintain current state and override specific properties below
    const newState: IAPIState = { ...state };

    if (type === request) {
      // Maintain the current state and just ensure certain flags are set properly
      newState.isFetching = false;
    } else if (isApiCallAction(action) && type === success && action.response) {
      newState.isFetching = false;
      newState.errorCode = undefined;
      // Don't store entities since those are stored elsewhere in Redux
      newState.response = { result: action.response.result };
    } else if (type === failure) {
      // TODO
    }

    return newState;
  }
};

export default callApi;
