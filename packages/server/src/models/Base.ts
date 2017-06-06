import { Model, JsonSchema } from 'objection';
import * as Knex from 'knex';

abstract class Base extends Model {
  public static jsonSchema: JsonSchema;
  protected static knexInstance: Knex;
  private static knexConfig: any;

  readonly id: string;
  createdAt: string;

  static init(knexConfig: any): void {
    Base.knexConfig = knexConfig;
    Base.knexInstance = Knex(Base.knexConfig);
    Base.knex(Base.knexInstance);
  }

  static getKnexConfig(): any {
    return Base.knexConfig;
  }

  static async close(): Promise<any> {
    if (Base.knexInstance) {
      await Promise.resolve(Base.knexInstance.destroy());
    }
  }
}

export default Base;
