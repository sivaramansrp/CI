import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';

const routes: Routes = [
  {
    path: 'action',
    component: PasoCapturarSolicitudComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'action',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvocarModuloRoutingModule { }
