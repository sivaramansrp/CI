import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [
  {
    path: 'solicitud-modificacion',
    component: DatosComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud-modificacion',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DatosSolicitudeRoutingModule { }
