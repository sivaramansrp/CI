import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ImportacionVehiculosNuevosPageComponent } from './pages/importacion-vehiculos-nuevos-page/importacion-vehiculos-nuevos-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: ImportacionVehiculosNuevosPageComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ImportacionVehiculosNuevosRoutingModule { }
