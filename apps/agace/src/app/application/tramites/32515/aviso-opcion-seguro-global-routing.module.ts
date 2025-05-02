import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import { RouterModule, Routes } from '@angular/router';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'solicitante',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitante',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule]
})
export class AvisoOpcionSeguroGlobalRoutingModule { }
