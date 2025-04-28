import { RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './page/certificado/certificado.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
      path: 'certificado',
      component: CertificadoComponent,
    },
    {
      path: '',
      redirectTo: 'certificado',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ValidarInicialmenteCertificadoRoutingModule { }
