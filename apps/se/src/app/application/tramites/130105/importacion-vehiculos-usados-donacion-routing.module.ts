import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ImportacionVehiculosUsadosDonacionComponent } from './pages/importacion-vehiculos-usados-donacion/importacion-vehiculos-usados-donacion.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: ImportacionVehiculosUsadosDonacionComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ImportacionVehiculosUsadosDonacionRoutingModule { }
