import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'annoys',
  exposes: {
    './Routes': 'apps/annoys/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
