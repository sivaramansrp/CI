import { RouterModule, Routes } from '@angular/router';
import { AtenderRequerimientoComponent } from './atender-requerimiento/atender-requerimiento.component';
import { AutorizarDictamenComponent } from './autorizar/autorizar-dictamen/autorizar-dictamen.component';
import { BandejaPendientesComponent } from './seleccion-modulo/seleccion-modulo.component';
import { BandejaSolicitudesComponent } from './bandeja-solicitudes/bandeja-solicitudes.component';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion/confirmar-notificacion.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { NgModule } from '@angular/core';
import { ObservacionesDictamenComponent } from './autorizar/observaciones/observaciones-dictamen.component';
import { SolicitudPageComponent } from './evaluar-solicitud/solicitud-page/solicitud-page.component';


const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-modulo' },
  {
    path: 'bandeja-pendientes',
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
    path: 'autorizar-dictamen',
    component: AutorizarDictamenComponent,
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
  },
  {
    path: 'observaciones-dictamen',
    component: ObservacionesDictamenComponent,
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
