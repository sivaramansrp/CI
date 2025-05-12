import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { RouterModule, Routes } from '@angular/router';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule]
})
export class TramitesDisponiblesRoutingModule { }
