import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'inbal',
  exposes: {
    './Routes': 'apps/inbal/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
