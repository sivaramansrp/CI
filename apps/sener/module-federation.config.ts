import { ModuleFederationConfig } from '@nx/webpack';

const CONFIG: ModuleFederationConfig = {
  name: 'sener',
  exposes: {
    './Module': 'apps/sener/src/app/application/app.module.ts',
    './Routes': 'apps/sener/src/app/remote-entry/entry.routes.ts',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular-architects/module-federation': { 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: 'auto' 
    }
  }
};

export default CONFIG;
