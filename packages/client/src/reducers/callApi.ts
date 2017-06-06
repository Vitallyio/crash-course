import { Action } from 'redux';
import { omit } from 'lodash';
import { isApiCallAction, IApiCallAction } from 'actions';

export interface IAPIState<ExtraResponseProperties> {
  isInitiallyLoaded: boolean;
  isFetching: boolean;
  response: { result: string | Array<string> } & ExtraResponseProperties;
  errorCode?: number;
}

export const initialState: IAPIState<any> = {
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
  ): IAPIState<any> => {
    const { type } = action;

    if (type === request) {
      // Maintain the current state and just ensure certain flags are set properly
      return {
        ...state,
        isFetching: true
      };
    } else if (isApiCallAction(action)) {
      switch (type) {
        case success:
          return {
            ...state,
            isFetching: false,
            errorCode: undefined,
            // Store everything but entities since those are stored elsewhere
            // in the Redux store
            response: omit(action.response as any, 'entities')
          };
        case failure:
          // TODO
          break;
        default:
          return state;
      }
    }

    return state;
  }
};

export default callApi;
