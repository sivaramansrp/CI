import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ImportacionDeVehiculosUsadosComponent } from './pages/importacion-de-vehiculos-usados/importacion-de-vehiculos-usados.component';

const routes: Routes = [
  {
    path: 'importacion-de-vehiculos',
    component: ImportacionDeVehiculosUsadosComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'importacion-de-vehiculos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacionDeVehiculosUsadosRoutingModule { }
