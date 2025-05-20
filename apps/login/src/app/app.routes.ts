import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AppLoginModule),
  },
];
