import { RouterModule, Routes } from '@angular/router';
import { AtenderRequerimientoComponent } from './atender-requerimiento/atender-requerimiento.component';
import { AutorizarDictamenComponent } from './autorizar/autorizar-dictamen/autorizar-dictamen.component';
import { BandejaPendientesComponent } from './bandeja-pendientes/bandeja-pendientes.component';
import { BandejaSolicitudesComponent } from './bandeja-solicitudes/bandeja-solicitudes.component';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion/confirmar-notificacion.component';
import { NgModule } from '@angular/core';
import { ObservacionesDictamenComponent } from './autorizar/observaciones/observaciones-dictamen.component';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { SolicitudPageComponent } from './evaluar-solicitud/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
    path: 'bandeja',
    component: BandejaPendientesComponent,
  },
  {
    path: 'atender-requerimiento',
    component: AtenderRequerimientoComponent,
  },
  {
    path: 'confirmar-notificacion',
    component: ConfirmarNotificacionComponent,
  },
  {
    path: 'evaluar-solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: 'seleccion-modulo',
    component: SeleccionModuloComponent,
  },
  {
    path: 'autorizar-dictamen',
    component: AutorizarDictamenComponent,
  },
  {
    path: 'observaciones-dictamen',
    component: ObservacionesDictamenComponent,
  },
  {
    path: 'bandeja-solicitudes',
    component: BandejaSolicitudesComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
