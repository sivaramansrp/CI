import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';

const ROUTES: Routes = [
   
    {
      path: 'action',
      component: PasoCapturarSolicitudComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModalidadControlodoraRoutingModule { }