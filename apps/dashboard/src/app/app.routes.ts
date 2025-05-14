import { Route } from '@angular/router';
//import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';
import { enviroment } from '@libs/shared/data-access-user/src';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion/confirmar-notificacion.component';
import { BandejaDeSolicitudesComponent } from './bandeja-de-solicitudes/bandeja-de-solicitudes.component';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes/bandeja-de-tareas-pendientes.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4201/remoteAppEntry.js`,
        remoteName: 'login',
        exposedModule: './Module',
      }).then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteDesdePanelComponent,
  },
  {
    path: 'aga',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4202/remoteAppEntry.js`,
        remoteName: 'aga',
        exposedModule: './Module',
      }).then((m) => m.AppAgaModule),
  },
  {
    path: 'agace',
    loadChildren: () =>
      // loadRemoteModule('agace', './Routes').then((m) => m.REMOTE_ROUTES),
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4209/remoteAppEntry.js`,
        remoteName: 'agace',
        exposedModule: './Module',
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4204/remoteAppEntry.js`,
        remoteName: 'agriculture',
        exposedModule: './Module',
      }).then((m) => m.AppAgriculturaModule),
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4205/remoteAppEntry.js`,
        remoteName: 'se',
        exposedModule: './Module',
      }).then((m) => m.AppSEModule),
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4206/remoteAppEntry.js`,
        remoteName: 'semarnat',
        exposedModule: './Module',
      }).then((m) => m.AppSemarnatModule),
  },
  {
    path: 'sener',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4217/remoteAppEntry.js`,
        remoteName: 'sener',
        exposedModule: './Module',
      }).then((m) => m.AppSenerModule),
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4210/remoteAppEntry.js`,
        remoteName: 'funcionario',
        exposedModule: './Module',
      }).then((m) => m.AppFuncionarioModule),
  },
  {
    path: 'agace',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4209/remoteAppEntry.js`,
        remoteName: 'agace',
        exposedModule: './Module',
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'cofepris',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4211/remoteAppEntry.js`,
        remoteName: 'cofepris',
        exposedModule: './Module',
      }).then((m) => m.AppCofeprisModule),
  },
  {
    path: 'sener',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4217/remoteAppEntry.js`,
        remoteName: 'sener',
        exposedModule: './Module',
      }).then((m) => m.AppSenerModule),
  },
  {
    path: 'cofepris',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4211/remoteAppEntry.js`,
        remoteName: 'cofepris',
        exposedModule: './Module',
      }).then((m) => m.AppCofeprisModule),
  },
  {
    path: 'amecafe',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4212/remoteAppEntry.js`,
        remoteName: 'amecafe',
        exposedModule: './Module',
      }).then((m) => m.AppAmecafeModule),
  },
  {
    path: 'sedena',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${enviroment.WEB_HOST}:4219/remoteAppEntry.js`,
        remoteName: 'sedena',
        exposedModule: './Module',
      }).then((m) => m.AppSedenaModule),
  },
  {
    path: 'inbal',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4218/remoteAppEntry.js',
        remoteName: 'inbal',
        exposedModule: './Module',
      }).then((m) => m.AppInbalModule),
  },
  {
    path: 'profepa',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4220/remoteAppEntry.js',
        remoteName: 'profepa',
        exposedModule: './Module',
      }).then((m) => m.AppProfepaModule),
  },
  {
    path: 'bandeja-de-solicitudes',
    component: BandejaDeSolicitudesComponent,
  },
  {
    path: 'bandeja-de-tareas-pendientes',
    component: BandejaDeTareasPendientesComponent,
  },
  {
    path: 'confirmar-notificacion',
    component: ConfirmarNotificacionComponent,
  },
];
