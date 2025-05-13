import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const ROUTES: Routes = [
  {
    path: 'expedicion-certificados-asignacion',
    component: PantallasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExpedicionCertificadoAsignacionRoutingModule { }
