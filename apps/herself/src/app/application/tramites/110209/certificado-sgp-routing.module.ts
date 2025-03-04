import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DetallesDelTransporteComponent } from './detalles-del-transporte/detalles-del-transporte.component';

const ROUTES: Routes = [

  {
    path:'demo',
    component:DetallesDelTransporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoSGPRoutingModule { }
