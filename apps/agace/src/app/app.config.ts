import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { APP_ROUTES } from './app.routes';
import { provideRouter } from '@angular/router';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
  ],
};
