import { schema, normalize } from 'normalizr';
import { IApiCallAction } from 'actions';

type DispatchFunction = (action: IApiCallAction) => void;

const API_BASE = 'http://localhost:5000/v1';

const makeApiCallWithSchema = (
  { endpoint, schema, types, dispatch }: {
    endpoint: string,
    schema: schema.Entity | [schema.Entity],
    types: IApiCallActionTypes,
    dispatch: DispatchFunction
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
