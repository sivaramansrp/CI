import { RouterModule, Routes } from '@angular/router';
import { ImportacionNeumaticosComercializarComponent } from './pages/importacion-neumaticos-comercializar/importacion-neumaticos-comercializar.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'neumaticos-comercializar',
    component :ImportacionNeumaticosComercializarComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'neumaticos-comercializar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ImportacionNeumaticosComercializarRoutingModule { }
