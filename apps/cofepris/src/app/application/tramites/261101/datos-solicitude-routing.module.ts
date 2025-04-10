import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [
  {
    path: 'solitudmodification',
    component: DatosComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solitudmodification',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DatosSolicitudeRoutingModule { }
