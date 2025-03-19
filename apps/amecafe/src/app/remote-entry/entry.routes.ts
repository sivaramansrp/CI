import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  { path: '', redirectTo: 'pago', pathMatch: 'full'},
  {
    path: 'pago', loadChildren: () => import('./../application/app.module').then(module => module.AppAmecafeModule)
  }
];
