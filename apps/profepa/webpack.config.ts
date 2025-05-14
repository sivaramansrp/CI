const { ModuleFederationPlugin } = require('webpack').container;
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
 /* mapped paths to share */
]);

module.exports = {
    output: {
        uniqueName: 'profepa',
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
        new ModuleFederationPlugin({
            name: 'profepa',
            filename: 'remoteAppEntry.js',
            exposes: {
                './Module': 'apps/profepa/src/app/application/app.module.ts',
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
                "@ng-mf/data-access-user": {
                    "singleton": false,
                    "import": "libs/shared/data-access-user/src/index.ts",
                },
                ...sharedMappings.getDescriptors()
            })
        }),
        sharedMappings.getPlugin()
    ],
    watchOptions: {
        ignored: 'node_modules'
      }
};