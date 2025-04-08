import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/naming-convention
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
    provideHttpClient()
  ],
};