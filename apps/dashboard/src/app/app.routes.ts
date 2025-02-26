import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [ 
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule('login', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'aga',
    loadChildren: () =>
      loadRemoteModule('aga', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'agace',
    loadChildren: () =>
      loadRemoteModule('agace', './Routes').then((m) => m.REMOTE_ROUTES),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule('agriculture', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule('se', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule('semarnat', './Routes').then((m) => m.remoteRoutes),
  }
];
