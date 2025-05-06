import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RegistroEmpresaComponent } from './pages/registro-empresa/registro-empresa.component';

const ROUTES: Routes = [
  {
    path:'registro-empresa',
    component: RegistroEmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroComoEmpresaRoutingModule { }
