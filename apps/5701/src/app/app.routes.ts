import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./application/app.module').then(module => module.App5701Module),
  },
];
