import { Action } from 'redux';
import { isApiCallAction, IApiCallAction } from 'actions/makeApiCall';

// This is the interface each API call will abide by. The 'response'
// field simply tracks the ID(s) to pull out of the 'entities' store
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

// Generic reducer to process a normalized API response. With this, we
// guarantee a 'loading' state while the API is responding, a consistent
// response format, and (if implemented) consistent error handling
const callApi = (
  { request, success, failure }: IApiCallActionTypes
) => {
  return (
    state = initialState,
    action: Action | IApiCallAction
  ): IAPIState => {
    const { type } = action;

    if ([request, success, failure].indexOf(type) < 0 || !isApiCallAction(action)) {
      return state;
    }

    // Maintain current state and override specific properties below
    const newState: IAPIState = { ...state };

    if (type === request) {
      // Maintain the current state and just ensure certain flags are set properly
      newState.isFetching = true;
    } else if (type === success && action.response) {
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
