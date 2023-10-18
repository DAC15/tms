import * as env from 'env-var';

export const UiConfig = {
  devtools: {
    enabled: env.get('NX_UI_DEVTOOLS_ENABLED').required().asBool(),
  },
};
