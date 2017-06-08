import { schema, normalize } from 'normalizr';
import { Action } from 'redux';

const API_BASE = 'http://localhost:5000/v1';

export interface IApiCallAction {
  type: string,
  response?: {
    entities: any,
    result: string | Array<string>
  },
  schema?: schema.Entity | [schema.Entity];
}

// Type guard to check if an Action is an 'API Action'. Note that there's
// better ways to implement this guard, but you get the idea :)
export const isApiCallAction = (action: Action): action is IApiCallAction => (
  Object.prototype.hasOwnProperty.call(action, 'schema')
);

// 'Reusable' action to send an API call and normalize the response
// (with normalizr). Any future API calls can use this function to
// consistently dispatch actions that our callApi reducer can process
const makeApiCallWithSchema = (
  { endpoint, schema, types, dispatch }: {
    endpoint: string,
    schema: schema.Entity | [schema.Entity],
    types: IApiCallActionTypes,
    dispatch: (action: IApiCallAction) => void
  }
) => {
  dispatch({
    type: types.request
  });

  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  };

  return fetch(`${API_BASE}/${endpoint}`, fetchOptions).then((response: Response) =>
    response.json().then((json: any) => {
      if (!response.ok) {
        // TODO: Display error
      }

      dispatch({
        type: types.success,
        response: normalize(json, schema),
        schema
      });
    })
  );
}

export default makeApiCallWithSchema;
