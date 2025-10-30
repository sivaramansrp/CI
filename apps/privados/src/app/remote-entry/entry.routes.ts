import { Route } from '@angular/router';

/**
 * Rutas expuestas del micro-frontend privados.
 * Estas rutas son consumidas por el host (dashboard) mediante Module Federation.
 */
export const REMOTE_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'vucem',
    pathMatch: 'full'
  },
  {
    path: 'vucem',
    loadChildren: () => import('./../app.routes').then(m => m.routes)
  }
];
