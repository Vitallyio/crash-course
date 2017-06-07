import { pickBy, includes, random } from 'lodash';

const JSF = require('json-schema-faker');

export const createFakerObject = <T>(
  jsonSchema: Object, jsonAttributes: Array<keyof T>, properties: Partial<T> = {}
): T => {

  const fake: Partial<T> = pickBy(JSF(jsonSchema) as T, (v, k: string) => (
    includes(jsonAttributes, k)
  ));

  if (includes(jsonAttributes as Array<string>, 'id') && !(fake as any).id) {
    (fake as any).id = random(1, 1000000).toString();
  }

  return Object.assign(
    {},
    fake,
    properties
  ) as T;
};
