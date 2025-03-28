import { ModuleFederationConfig } from '@nx/webpack';

const CONFIG: ModuleFederationConfig = {
  name: 'sener',
  exposes: {
    './Module': 'apps/sener/src/app/application/app.module.ts',
    './Routes': 'apps/sener/src/app/remote-entry/entry.routes.ts',
  },
  // Definido como un objeto compatible con NX
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/common/http': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
    '@angular/forms': { singleton: true, strictVersion: true }
  }
};

export default CONFIG;
