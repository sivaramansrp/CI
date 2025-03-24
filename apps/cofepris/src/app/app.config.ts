import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

/**
 * Configuración de la aplicación Cofepris.
 * 
 * @export
 * @const {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor para la detección de cambios en la zona.
     * 
     * @type {Provider}
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor para las rutas de la aplicación.
     * 
     * @type {Provider}
     */
    provideRouter(appRoutes),
  ],
};