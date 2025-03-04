import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'but',
  exposes: {
    './Routes': 'apps/but/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
