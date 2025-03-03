import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'agricultura',
  exposes: {
    './Routes': 'apps/agricultura/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
