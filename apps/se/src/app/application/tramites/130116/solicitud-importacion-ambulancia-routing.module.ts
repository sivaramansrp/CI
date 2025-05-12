import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitudImportacionAmbulanciaComponent } from './pages/solicitud-importacion-ambulancia/solicitud-importacion-ambulancia.component';

const ROUTES: Routes = [
  {
    path: 'reconstruccion-reacondicionamiento',
    component: SolicitudImportacionAmbulanciaComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reconstruccion-reacondicionamiento'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SolicitudImportacionAmbulanciaRoutingModule { }
