// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'typescript_react_redux_monorepo_development',
      user: 'sa',
      password: 'sa'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'typescript_react_redux_monorepo_test',
      user:     'sa',
      password: 'sa'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
