import databaseConfig from './database';
import jwtConfig from './jwt';

const config = {};

config.port = process.env.PORT || 3000;
config.nodeEnv = process.env.NODE_ENV || 'development';
config.db = databaseConfig;
config.jwt = jwtConfig;
config.authProviders = {
  jwt: 'jwt',
};

export default config;

