import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { ImportacionMaterialDeInvestigacionCientificaComponent } from './pages/importacion-material-de-investigacion-cientifica/importacion-material-de-investigacion-cientifica.component';

const ROUTES: Routes = [
  {
    path: 'importacion-material-de-investigacion-cientifica',
    component: ImportacionMaterialDeInvestigacionCientificaComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'importacion-material-de-investigacion-cientifica'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ImportacionMaterialDeInvestigacionCientificaRoutingModule { }
