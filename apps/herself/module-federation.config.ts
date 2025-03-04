import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'herself',
  exposes: {
    './Routes': 'apps/herself/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
