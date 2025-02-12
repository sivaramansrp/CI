import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { path: '', redirectTo: 'pago', pathMatch: 'full' },
  {
    path: 'pago', loadChildren: () => import('./../220401/pantallas.module').then(module => module.PantallasModule)
  }
];
