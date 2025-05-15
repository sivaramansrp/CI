import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { APPINJECT } from './app.inject';
import { ENVIRONMENT } from './environments/environment';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

/**
 * Esta es la configuración principal de la aplicación Agace.
 * Aquí se definen los proveedores y la configuración de la aplicación.
 * Se utiliza para establecer la detección de cambios, las rutas y el cliente HTTP. 
 */
export const APPCONFIG: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: APPINJECT, useValue: ENVIRONMENT },
  ],
};
