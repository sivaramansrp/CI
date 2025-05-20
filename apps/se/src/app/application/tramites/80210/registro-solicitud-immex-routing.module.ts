import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { registroSolicitudImmexComponent } from './pages/registro-solicitud-immex/registro-solicitud-immex.component';

const ROUTES: Routes = [
  {
    path: 'confirmacion',
    component: registroSolicitudImmexComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'confirmacion',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class registroSolicitudImmexRoutingModule {}
