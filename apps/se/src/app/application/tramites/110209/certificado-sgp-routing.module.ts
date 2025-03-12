import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RegistroDeMercanciaComponent } from './components/registro-de-mercancia/registro-de-mercancia.component';
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
  {
    path:'registro-de-mercancia',
    component:RegistroDeMercanciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoSGPRoutingModule { }
