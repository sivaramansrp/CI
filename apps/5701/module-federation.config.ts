import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: '5701',
  exposes: {
    './Routes': 'apps/5701/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
