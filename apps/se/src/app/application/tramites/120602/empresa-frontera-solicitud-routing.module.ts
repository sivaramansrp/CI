import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EmpresaFronteraSolicitudComponent } from './pages/empresa-frontera-solicitud/empresa-frontera-solicitud';

// eslint-disable-next-line @typescript-eslint/naming-convention
const routes: Routes = [
  {
      path: 'datos-empresa',
      component: EmpresaFronteraSolicitudComponent,
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaFronteraSolicitudRoutingModule { }
