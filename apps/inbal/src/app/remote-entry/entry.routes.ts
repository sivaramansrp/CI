
import { RemoteEntryComponent } from './entry.component';
import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  { path: '', redirectTo: 'pago' ,component: RemoteEntryComponent },
  {
    path: 'pago', loadChildren: () => import('../application/app.module').then(module => module.AppInbalModule)
  }
];
