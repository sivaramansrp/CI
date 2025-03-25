import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


const ROUTES: Routes = [

  {
    path:'solicitud',
    component:SolicitudPageComponent
  },
  {
    path:'',
    redirectTo:'solicitud',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoSGPRoutingModule { }
