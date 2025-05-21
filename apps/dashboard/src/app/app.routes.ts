import { BandejaDeSolicitudesComponent } from './bandeja-de-solicitudes/bandeja-de-solicitudes.component';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes/bandeja-de-tareas-pendientes.component';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion/confirmar-notificacion.component';
import { Route } from '@angular/router';
import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { ENVIRONMENT } from './environments/environment';
import { SubsecuentesComponent } from './subsecuentes/subsecuentes.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.login}/remoteAppEntry.js`,
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
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.aga}/remoteAppEntry.js`,
        remoteName: 'aga',
        exposedModule: './Module',
      }).then((m) => m.AppAgaModule),
  },
  {
    path: 'agace',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.agace}/remoteAppEntry.js`,
        remoteName: 'agace',
        exposedModule: './Module',
      }).then((m) => m.AppAgaceModule),
  },
  {
    path: 'agriculture',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.agriculture}/remoteAppEntry.js`,
        remoteName: 'agriculture',
        exposedModule: './Module',
      }).then((m) => m.AppAgriculturaModule),
  },
  {
    path: 'se',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.se}/remoteAppEntry.js`,
        remoteName: 'se',
        exposedModule: './Module',
      }).then((m) => m.AppSEModule),
  },
  {
    path: 'semarnat',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.semarnat}/remoteAppEntry.js`,
        remoteName: 'semarnat',
        exposedModule: './Module',
      }).then((m) => m.AppSemarnatModule),
  },
  {
    path: 'sener',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.sener}/remoteAppEntry.js`,
        remoteName: 'sener',
        exposedModule: './Module',
      }).then((m) => m.AppSenerModule),
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.funcionario}/remoteAppEntry.js`,
        remoteName: 'funcionario',
        exposedModule: './Module',
      }).then((m) => m.AppFuncionarioModule),
  },
  {
    path: 'amecafe',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.amecafe}/remoteAppEntry.js`,
        remoteName: 'amecafe',
        exposedModule: './Module',
      }).then((m) => m.AppAmecafeModule),
  },
  {
    path: 'sedena',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.sedena}/remoteAppEntry.js`,
        remoteName: 'sedena',
        exposedModule: './Module',
      }).then((m) => m.AppSedenaModule),
  },
  {
    path: 'inbal',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.inbal}/remoteAppEntry.js`,
        remoteName: 'inbal',
        exposedModule: './Module',
      }).then((m) => m.AppInbalModule),
  },
  {
    path: 'cofepris',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.cofepris}/remoteAppEntry.js`,
        remoteName: 'cofepris',
        exposedModule: './Module',
      }).then((m) => m.AppCofeprisModule),
  },
  {
    path: 'profepa',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.profepa}/remoteAppEntry.js`,
        remoteName: 'profepa',
        exposedModule: './Module',
      }).then((m) => m.AppProfepaModule),
  },
  {
    path: 'inah',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.inah}/remoteAppEntry.js`,
        remoteName: 'inah',
        exposedModule: './Module',
      }).then((m) => m.AppINAHModule),
  },
  {
    path: 'crt',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.crt}/remoteAppEntry.js`,
        remoteName: 'crt',
        exposedModule: './Module',
      }).then((m) => m.AppCrtModule),
  },
  {
    path: 'stps',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${ENVIRONMENT.REMOTE_APPS.stps}/remoteAppEntry.js`,
        remoteName: 'stps',
        exposedModule: './Module',
      }).then((m) => m.AppStpsModule),
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
  {
    path: 'confirmar-resolucion',
    component: ConfirmarNotificacionComponent,
  },
  {
    path: 'subsecuentes',
    component: SubsecuentesComponent,
  },
];
