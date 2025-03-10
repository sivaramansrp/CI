
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SolicitudModalidadPageComponent } from './pages/solicitud-modalidad-page/solicitud-modalidad-page.component';

export const ROUTES_SOLICITUD: Routes = [
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
  imports: [RouterModule.forChild(ROUTES_SOLICITUD)],
  exports: [RouterModule]
})
export class RegistroSolicitudRoutingModule { }