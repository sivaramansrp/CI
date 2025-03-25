import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(RemoteEntryComponent, appConfig).catch((err) =>
  console.error(err)
);
