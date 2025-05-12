import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { SanidadCertificadoComponent } from './pages/sanidad-certificado/sanidad-certificado.component';
const ROUTES: Routes = [ // Renamed to UPPER_CASE
  {
    path: 'sanidad',
    component: SanidadCertificadoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sanidad',
  },
]; @NgModule({
  imports: [RouterModule.forChild(ROUTES)], // Used the updated name here
  exports: [RouterModule]
})
export class ImportacionDeAcuiculturaRoutingModule { }
