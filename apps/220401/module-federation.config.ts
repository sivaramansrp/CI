import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: '220401',
  exposes: {
    './Routes': 'apps/220401/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
