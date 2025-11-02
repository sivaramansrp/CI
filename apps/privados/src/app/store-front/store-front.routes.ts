import { Routes } from '@angular/router';
import { StoreFrontLayoutTsComponent } from './layout/store-front-layout.ts/store-front-layout.ts.component';
import { STORE_FRONT_ROUTES } from './store-front.routes.constants';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutTsComponent,
    children: [
      {
        path: '',
        redirectTo: STORE_FRONT_ROUTES.HOME,
        pathMatch: 'full'
      },
      {
        path: STORE_FRONT_ROUTES.HOME,
        loadComponent: () => import('./pages/home/home.page').then((c) => c.HomePage),
      },
      {
        path: STORE_FRONT_ROUTES.CONSULTAS,
        loadChildren: () => import('../features/consultas/consultas.routes').then((m) => m.consultasRoutes),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
      },
    ],
  },
];

export default storeFrontRoutes;
