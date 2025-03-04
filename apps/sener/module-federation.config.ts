import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'sener',
  exposes: {
    './Routes': 'apps/sener/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
