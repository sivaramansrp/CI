import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PeruCertificadoComponent } from './page/peru-certificado/peru-certificado.component';

const ROUTES: Routes = [
  {
      path: 'peru',
      component: PeruCertificadoComponent,
    },
    {
      path: '',
      redirectTo: 'peru',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ValidarCertificadoRoutingModule { }
