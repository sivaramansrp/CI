/* eslint-disable @typescript-eslint/no-var-requires */
// import { withModuleFederation } from '@nx/angular/module-federation';
// import config from './module-federation.config';

// module.exports = withModuleFederation(config);


const { ModuleFederationPlugin: MODULE_FEDERATION_PLUGIN } = require('webpack').container;
const MF = require('@angular-architects/module-federation/webpack');
const PATH = require('path');
const SHARE = MF.share;

const SHARED_MAPPINGS = new MF.SharedMappings();
SHARED_MAPPINGS.register(PATH.join(__dirname, '../../tsconfig.base.json'), [
 /* mapped paths to share */
]);

module.exports = {
 output: {
  uniqueName: 'sener',
  publicPath: 'auto',
  scriptType: 'text/javascript'
 },
 optimization: {
  runtimeChunk: false
 },
 resolve: {
  alias: {
   ...SHARED_MAPPINGS.getAliases()
  }
 },
 plugins: [
  new MODULE_FEDERATION_PLUGIN({
   name: 'sener',
   filename: 'remoteAppEntry.js',
   exposes: {
    './Module': 'apps/sener/src/app/application/app.module.ts',
   },
   shared: SHARE({ 
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular-architects/module-federation': {
     singleton: true,
     strictVersion: true,
     requiredVersion: 'auto'
    },
     "@ng-mf/data-access-user": {
          "singleton": false,
          strictVersion: false,
          requiredVersion: false,
          "import": "libs/shared/data-access-user/src/index.ts",
      },
    ...SHARED_MAPPINGS.getDescriptors()
   })
  }),
  SHARED_MAPPINGS.getPlugin()
 ],
 watchOptions: {
    ignored: 'node_modules'
  }
};
