import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ImportacionOtrosVehiculosUsadosPageComponent } from './pages/importacion-otros-vehiculos-usados-page/importacion-otros-vehiculos-usados-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: ImportacionOtrosVehiculosUsadosPageComponent,

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
export class ImportacionOtrosVehiculosUsadosRoutingModule { }
