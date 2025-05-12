import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'inah',
  exposes: {
    './Routes': 'apps/inah/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
