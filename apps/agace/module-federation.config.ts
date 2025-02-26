import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'agace',
  exposes: {
    './Routes': 'apps/agace/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
