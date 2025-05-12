import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import { DesistimientoSolicitudComponent } from './pages/desistimiento-solicitud/desistimiento-solicitud.component';

const ROUTES_SOLICITUDES: Routes = [
    {
      path: 'solicitud',
      component: DesistimientoSolicitudComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'solicitud',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule]
})
export class SemarnatDesistimientoRoutingModule { }
