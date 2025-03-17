import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'vehiculos-usados-adaptados',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vehiculos-usados-adaptados',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule]
})
export class VehiculosUsadosAdaptadosRoutingModule { }
