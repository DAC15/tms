import * as env from 'env-var';

export const SharedConfig = {
  url: <Record<'api' | 'ui', string>>{
    api: env.get('NX_URL_API').required().asString(),
    ui: env.get('NX_URL_UI').required().asString(),
  },
};
