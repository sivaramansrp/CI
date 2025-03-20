import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const routes: Routes = [
  {
      path: 'certificado-origen',
      component: SolicitudPageComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'certificado-origen',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidarInicalmenteRoutingModule { }
