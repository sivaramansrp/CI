import { bootstrapApplication } from '@angular/platform-browser';
import { APPCONFIG } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, APPCONFIG).catch((err) =>
  console.error(err)
);
