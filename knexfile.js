const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'test';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: 'nc_knews_dev',
      user: 'tim',
      password: 'password',
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  test: {
    connection: {
      database: 'nc_knews_test',
      user: 'tim',
      password: 'password',
    },
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
