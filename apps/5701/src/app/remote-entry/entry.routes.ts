import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  {
    path: 'pago', loadChildren: () => import('./../application/app.module').then(module => module.App5701Module)
  }
];
