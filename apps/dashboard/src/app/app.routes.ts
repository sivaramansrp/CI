import { Route } from '@angular/router';
//import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteAppEntry.js',
        remoteName: 'login',
        exposedModule: './Module'
      }).then((m) => m.RemoteEntryModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteDesdePanelComponent
  },
  {
    path: 'aga',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteAppEntry.js',
        remoteName: 'aga',
        exposedModule: './Module'
      }).then((m) => m.AppAgaModule)
  },
  {
    path: 'agace',
    loadChildren: () =>
      // loadRemoteModule('agace', './Routes').then((m) => m.REMOTE_ROUTES),
      loadRemoteModule({
        remoteEntry: 'http://localhost:4209/remoteAppEntry.js',
        remoteName: 'agace',
        exposedModule: './Module'
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4204/remoteAppEntry.js',
        remoteName: 'agriculture',
        exposedModule: './Module'
      }).then((m) => m.AppAgriculturaModule)
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4205/remoteAppEntry.js',
        remoteName: 'se',
        exposedModule: './Module'
      }).then((m) => m.AppSEModule)
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4206/remoteAppEntry.js',
        remoteName: 'semarnat',
        exposedModule: './Module'
      }).then((m) => m.AppSemarnatModule)
  },
  {
    path: 'funcionario',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: 'http://localhost:4210/remoteAppEntry.js',
            remoteName: 'funcionario',
            exposedModule: './Module'
        }).then((m) => m.AppFuncionarioModule)
  },
  {
    path: 'agace',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4209/remoteAppEntry.js',
        remoteName: 'agace',
        exposedModule: './Module'
      }).then((m) => m.AppAgaceModule)
  },
  {
    path: 'sener',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: 'http://localhost:4217/remoteAppEntry.js',
            remoteName: 'sener',
            exposedModule: './Module'
        }).then((m) => m.AppSenerModule)
  },
  {
    path: 'cofepris',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4211/remoteAppEntry.js',
        remoteName: 'cofepris',
        exposedModule: './Module'
      }).then((m) => m.AppCofeprisModule)
  },
];
