import * as env from 'env-var';

export const ApiConfig = {
  auth: {
    accessTokenSecret: env
      .get('API_AUTH_ACCESS_TOKEN_SECRET')
      .required()
      .asString(),
    accessTokenExpire: env
      .get('API_AUTH_ACCESS_TOKEN_EXPIRE')
      .required()
      .asIntPositive(),
  },
  database: {
    host: env.get('API_DB_HOST').required().asString(),
    port: env.get('API_DB_PORT').required().asPortNumber(),
    username: env.get('API_DB_USER').required().asString(),
    password: env.get('API_DB_PASS').required().asString(),
    sync: env.get('API_DB_SYNC').required().asBool(),
    certificate: env.get('API_DB_CERT').asString(),
    name: env.get('API_DB_NAME').asString(),
  },
};
