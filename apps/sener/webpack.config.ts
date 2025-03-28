const { withModuleFederation } = require('@nx/angular/module-federation');

// Importar directamente el archivo de configuración
module.exports = withModuleFederation(require('./module-federation.config'));
