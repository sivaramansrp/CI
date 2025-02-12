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
    path: '501',
    loadChildren: () =>
      loadRemoteModule('501', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '220401',
    loadChildren: () =>
      loadRemoteModule('220401', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '5701',
    loadChildren: () =>
      loadRemoteModule('5701', './Routes').then((m) => m.remoteRoutes),
  }
];
