/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { withModuleFederation } from '@nx/angular/module-federation';
// import config from './module-federation.config';

// module.exports = withModuleFederation(config);


const { ModuleFederationPlugin: MODULE_FEDERATION_PLUGIN } = require('webpack').container;
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
 /* mapped paths to share */
]);

module.exports = {
 output: {
  uniqueName: 'semarnat',
  publicPath: 'auto',
  scriptType: 'text/javascript'
 },
 optimization: {
  runtimeChunk: false
 },
 resolve: {
  alias: {
   ...sharedMappings.getAliases()
  }
 },
 plugins: [
  new MODULE_FEDERATION_PLUGIN({
   name: 'semarnat',
   filename: 'remoteAppEntry.js',
   exposes: {
    './Module': 'apps/semarnat/src/app/remote-entry/entry.module.ts',
   },
   shared: share({
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular-architects/module-federation': {
     singleton: true,
     strictVersion: true,
     requiredVersion: 'auto'
    },

    ...sharedMappings.getDescriptors()
   })
  }),
  sharedMappings.getPlugin()
 ]
};