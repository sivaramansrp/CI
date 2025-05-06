import { Route } from '@angular/router';
//import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/login/remoteAppEntry.js`,
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
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/aga/remoteAppEntry.js`,
        remoteName: 'aga',
        exposedModule: './Module'
      }).then((m) => m.AppAgaModule)
  },
  {
    path: 'agace',
    loadChildren: () =>
      // loadRemoteModule('agace', './Routes').then((m) => m.REMOTE_ROUTES),
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/agace/remoteAppEntry.js`,
        remoteName: 'agace',
        exposedModule: './Module'
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/agriculture/remoteAppEntry.js`,
        remoteName: 'agriculture',
        exposedModule: './Module'
      }).then((m) => m.AppAgriculturaModule)
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/se/remoteAppEntry.js`,
        remoteName: 'se',
        exposedModule: './Module'
      }).then((m) => m.AppSEModule)
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.WEB_HOST}/semarnat/remoteAppEntry.js`,
        remoteName: 'semarnat',
        exposedModule: './Module'
      }).then((m) => m.AppSemarnatModule)
  },
  {
    path: 'funcionario',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: `${ENVIRONMENT.WEB_HOST}/funcionario/remoteAppEntry.js`,
            remoteName: 'funcionario',
            exposedModule: './Module'
        }).then((m) => m.AppFuncionarioModule)
  },
  {
  path: 'amecafe',
  loadChildren: () =>
      loadRemoteModule({
          remoteEntry: `${ENVIRONMENT.WEB_HOST}/amecafe/remoteAppEntry.js`,
          remoteName: 'amecafe',
          exposedModule: './Module'
      }).then((m) => m.AppAmecafeModule)
  } ,
  {
    path: 'sedena',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: `${ENVIRONMENT.WEB_HOST}/sedena/remoteAppEntry.js`,
            remoteName: 'sedena',
            exposedModule: './Module'
        }).then((m) => m.AppSedenaModule)
  },
  {
    path: 'inbal',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: `${ENVIRONMENT.WEB_HOST}/inbal/remoteAppEntry.js`,
            remoteName: 'inbal',
            exposedModule: './Module'
        }).then((m) => m.AppInbalModule)
  },
  {
    path: 'profepa',
    loadChildren: () =>
        loadRemoteModule({
            remoteEntry: `${ENVIRONMENT.WEB_HOST}/profepa/remoteAppEntry.js`,
            remoteName: 'profepa',
            exposedModule: './Module'
        }).then((m) => m.AppProfepaModule)
  }

];