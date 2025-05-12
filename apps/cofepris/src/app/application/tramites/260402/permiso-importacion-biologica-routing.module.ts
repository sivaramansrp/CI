import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PermisoImportacionBiologicaComponent } from './pages/permiso-importacion-biologica/permiso-importacion-biologica.component';

const ROUTES:Routes = [
  {
    path:'solictud',
    component:PermisoImportacionBiologicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EntradaHumanaRoutingModule { }
