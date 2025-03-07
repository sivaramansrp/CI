import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ValidarCertificadoTecnicoJaponComponent } from './pages/validar-certificado-tecnico-japon/validar-certificado-tecnico-japon.component';


const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'validar-certificado-tecnico-japon'
  },
  {
    path: 'validar-certificado-tecnico-japon',
    component: ValidarCertificadoTecnicoJaponComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoTecnicoJaponRoutingModule { }
