import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ComponenteDeActualizacionComponent } from './components/componente-de-actualizacion/componente-de-actualizacion.component';
const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
  {
    path: 'actualizacion',
    component: ComponenteDeActualizacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ConsultaAvisoAcreditacionRoutingModule {}
