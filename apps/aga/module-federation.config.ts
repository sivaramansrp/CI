import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'aga',
  exposes: {
    './Routes': 'apps/aga/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
