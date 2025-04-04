import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionModuloComponent } from '../seleccion-modulo/seleccion-modulo.component';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion/confirmar-notificacion.component';
import { AtenderRequerimientoComponent } from './atender-requerimiento/atender-requerimiento.component';
import { BandejaPendientesComponent } from './bandeja-pendientes/bandeja-pendientes.component';
import { AutorizarDictamenComponent } from './autorizar/autorizar-dictamen/autorizar-dictamen.component';
import { SolicitudPageComponent } from './evaluar-solicitud/solicitud-page/solicitud-page.component';
import { GenerarDictamenComponent } from './evaluar-solicitud/generar-dictamen/generar-dictamen.component';
import { ObservacionesDictamenComponent } from './autorizar/observaciones/observaciones-dictamen.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
