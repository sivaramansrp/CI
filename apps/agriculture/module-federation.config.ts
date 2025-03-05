import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'agriculture',
  exposes: {
    './Routes': 'apps/agriculture/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
