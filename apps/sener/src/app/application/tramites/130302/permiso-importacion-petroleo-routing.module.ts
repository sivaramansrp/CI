import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportacionExportacionPetroleoComponent } from './components/importacion-exportacion-petroleo/importacion-exportacion-petroleo.component';

const routes: Routes = [
  {
      path: 'pantallas',
      component: ImportacionExportacionPetroleoComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoImportacionPetroleoRoutingModule { }
