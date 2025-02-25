import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'semarnat',
  exposes: {
    './Routes': 'apps/semarnat/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
