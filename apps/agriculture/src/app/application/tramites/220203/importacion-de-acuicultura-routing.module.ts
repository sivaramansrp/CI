import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SanidadCertificadoComponent } from './pages/sanidad-certificado/sanidad-certificado.component';

const routes: Routes = [
  {
    path: 'sanidad',
    component: SanidadCertificadoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sanidad',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacionDeAcuiculturaRoutingModule { }
