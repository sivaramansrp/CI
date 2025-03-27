import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
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
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ValidarInicalmenteRoutingModule { }
