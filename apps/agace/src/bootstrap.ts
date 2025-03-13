import { APP_CONFIG } from './app/app.config';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(RemoteEntryComponent, APP_CONFIG).catch((err) =>
  console.error(err)
);
