import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ValidarCertificadoTecnicoJaponComponent } from './pages/validar-certificado-tecnico-japon/validar-certificado-tecnico-japon.component';

import { MercanciasSeleccionadasFormComponent } from './components/mercancias-seleccionadas-form/mercancias-seleccionadas-form.component';


const ROUTES: Routes = [
  
  {
    path: 'validar-certificado-tecnico-japon',
    component: ValidarCertificadoTecnicoJaponComponent
  },
  {
    path: 'mercancias-seleccionadas-form',
    component: MercanciasSeleccionadasFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'validar-certificado-tecnico-japon'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoTecnicoJaponRoutingModule { }
