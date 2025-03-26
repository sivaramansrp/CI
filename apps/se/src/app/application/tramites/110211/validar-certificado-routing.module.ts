import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamCertificadoComponent } from './page/cam-certificado/cam-certificado.component';

const routes: Routes = [
  {
      path: 'cam',
      component: CamCertificadoComponent,
    },
    {
      path: '',
      redirectTo: 'prosec',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidarCertificadoRoutingModule { }
