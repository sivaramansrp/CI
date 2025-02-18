import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudModalidadPageComponent } from './pages/solicitud-modalidad-page/solicitud-modalidad-page.component';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'modalidad',
    component: SolicitudModalidadPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'modalidad',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule]
})
export class RegistroSolicitudModalidadRoutingModule { }
