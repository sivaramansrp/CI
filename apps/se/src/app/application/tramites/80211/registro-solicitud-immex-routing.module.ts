import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { registroSolicitudImmexComponent } from './pages/registro-solicitud-immex/registro-solicitud-immex.component';

const ROUTES: Routes = [
  {
    path: 'modalidad-ampliacion-terciarizadoras',
    component: registroSolicitudImmexComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'modalidad-ampliacion-terciarizadoras',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class registroSolicitudImmexRoutingModule {}
