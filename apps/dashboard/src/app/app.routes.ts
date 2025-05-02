import { Route } from '@angular/router';
//import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';
import { enviroment } from '@libs/shared/data-access-user/src';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/login/remoteAppEntry.js',
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
        remoteEntry: 'http://localhost:4202/aga/remoteAppEntry.js',
        remoteName: 'aga',
        exposedModule: './Module'
      }).then((m) => m.AppAgaModule)
  },
  {
    path: 'agace',
    loadChildren: () =>
      // loadRemoteModule('agace', './Routes').then((m) => m.REMOTE_ROUTES),
      loadRemoteModule({
        remoteEntry: 'http://localhost:4209/agace/remoteAppEntry.js',
        remoteName: 'agace',
        exposedModule: './Module'
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4204/agriculture/remoteAppEntry.js',
        remoteName: 'agriculture',
        exposedModule: './Module'
      }).then((m) => m.AppAgriculturaModule)
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4205/se/remoteAppEntry.js',
        remoteName: 'se',
        exposedModule: './Module'
      }).then((m) => m.AppSEModule)
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4206/se/remoteAppEntry.js',
        remoteName: 'semarnat',
        exposedModule: './Module'
      }).then((m) => m.AppSemarnatModule)
  },
  {
    path: 'funcionario',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry:'http://localhost:4210/funcionario/remoteAppEntry.js',
            remoteName: 'funcionario',
            exposedModule: './Module'
        }).then((m) => m.AppFuncionarioModule)
  },
  {
  path: 'amecafe',
  loadChildren: () =>
      loadRemoteModule({
          remoteEntry: 'http://localhost:4212/amecafe/remoteAppEntry.js',
          remoteName: 'amecafe',
          exposedModule: './Module'
      }).then((m) => m.AppAmecafeModule)
  } ,
  {
    path: 'sedena',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: 'http://localhost:4219/sedena/remoteAppEntry.js',
            remoteName: 'sedena',
            exposedModule: './Module'
        }).then((m) => m.AppSedenaModule)
  },
  {
    path: 'inbal',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry:'http://localhost:4218/inbal/remoteAppEntry.js',
            remoteName: 'inbal',
            exposedModule: './Module'
        }).then((m) => m.AppInbalModule)
  },
  {
    path: 'profepa',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: 'http://localhost:4220/profepa/remoteAppEntry.js',
            remoteName: 'profepa',
            exposedModule: './Module'
        }).then((m) => m.AppProfepaModule)
  }

];