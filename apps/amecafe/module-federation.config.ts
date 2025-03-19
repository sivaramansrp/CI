import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'amecafe',
  exposes: {
    './Routes': 'apps/amecafe/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
