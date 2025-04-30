import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ENVIRONMENT } from './environments/environment';

import { APP_CONFIG } from './app.inject';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: ENVIRONMENT },
  ],
};
