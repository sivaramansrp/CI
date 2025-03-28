const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = withModuleFederation({
  name: 'sener',
  exposes: {
    './Module': './apps/sener/src/app/application/app.module.ts',
    './Routes': './apps/sener/src/app/remote-entry/entry.routes.ts'
  },
  shared: (libraryName, sharedConfig) => {
    // Lista de bibliotecas que se compartirán con configuración singleton
    const libraries = [
      '@angular/core',
      '@angular/common',
      '@angular/common/http',
      '@angular/router',
      '@angular/forms',
      '@angular-architects/module-federation'
    ];
    
    // Determina si la biblioteca debe compartirse y con qué configuración
    if (libraries.includes(libraryName)) {
      return {
        singleton: true,
        strictVersion: true,
        requiredVersion: sharedConfig.requiredVersion
      };
    }
    
    // No compartir bibliotecas que no están en la lista
    return false;
  }
});
