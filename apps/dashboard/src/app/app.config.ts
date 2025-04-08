import { ApplicationConfig } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal'; // Agrega esto
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    BsModalService
  ]
};
