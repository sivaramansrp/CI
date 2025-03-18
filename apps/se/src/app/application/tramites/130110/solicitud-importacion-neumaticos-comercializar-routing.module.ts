import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudImportacionNeumaticosComercializarComponent } from './pages/solicitud-importacion-neumaticos-comercializar/solicitud-importacion-neumaticos-comercializar.component';

const routes: Routes = [

  {
    path: 'solicitud',
    component: SolicitudImportacionNeumaticosComercializarComponent,
  },
  {
    path: '',
    redirectTo: 'solicitud',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudImportacionNeumaticosComercializarRoutingModule { }
