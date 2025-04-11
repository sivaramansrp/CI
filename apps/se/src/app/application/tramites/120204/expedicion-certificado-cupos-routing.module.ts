import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitudExpedicionPageComponent } from './pages/solicitudExpedicion-page/solicitudExpedicion-page.component';

// Definición de las rutas para el módulo
const ROUTES: Routes = [
  {
    path: 'solicitud-expedicion', 
    component: SolicitudExpedicionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExpedicionCertificadoRoutingModule { }
