
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ENVIRONMENT } from './environments/environment';

import { APPINJECT } from './app.inject';

/**
 * Esta es la configuración principal de la aplicación Agace.
 * Aquí se definen los proveedores y la configuración de la aplicación.
 * Se utiliza para establecer la detección de cambios, las rutas y el cliente HTTP. 
 */
export const APPCONFIG: ApplicationConfig = {
  providers: [provideRouter(appRoutes),
  provideHttpClient(),
  provideAnimations(),
  provideToastr(),
  { provide: APPINJECT, useValue: ENVIRONMENT },
  ],
};