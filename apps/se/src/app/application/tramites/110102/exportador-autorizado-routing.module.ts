import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [
  {
    path:'registrar-solicitud',
    component:DatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExportadorautorizadoRoutingModule { }
