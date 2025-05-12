import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ActualizacionImportacionSanitariaComponent } from './pages/actualizacion-importacion-sanitaria/actualizacion-importacion-sanitaria.component';

const ROUTES: Routes = [
  {
    path:'solictud',
    component:ActualizacionImportacionSanitariaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ActualizacionImportacionSanitariaRoutingModule { }
