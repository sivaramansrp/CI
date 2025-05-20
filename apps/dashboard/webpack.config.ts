const { ModuleFederationPlugin } = require('webpack').container;
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

// Determinar dinámicamente la publicPath
function getPublicPath() {
console.log('NODE_ENV: ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    return 'https://front.v30.ultrasist.net/';
  } else {
    // return 'http://localhost:4200/';
    return '/';
  }
}

module.exports = {
  output: {
    uniqueName: 'dashboard',
    // Usar URL absoluta en lugar de 'auto' para evitar problemas
    publicPath: getPublicPath(),
    scriptType: 'text/javascript',
    // Asegurar que el nombre del archivo sea consistente
    filename: '[name].js',
    chunkFilename: '[name].js',
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
      name: 'dashboard',
      // Agregar filename para asegurar que el punto de entrada remoto sea constante
      filename: 'remoteAppEntry.js',
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
            strictVersion: false,
            requiredVersion: false,
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