import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SanidadCertificadoComponent } from './pages/sanidad-certificado/sanidad-certificado.component';
const ROUTES: Routes = [ 
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
  imports: [RouterModule.forChild(ROUTES)], 
  exports: [RouterModule]
})
export class ImportacionDeAcuiculturaRoutingModule { }
