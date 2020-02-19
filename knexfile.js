// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    userNullAsDefault: true,
    connection: {
      filename: './data/users.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('Pragma foreign_keys = ON', done)
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
