import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AcusePageComponent } from '../../shared/pages/acuse-page/acuse-page.component';
import { GenerarDictamenComponent } from './pages/generar-dictamen/generar-dictamen.component';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
  {
    path: 'generar-dictamen',
    component: GenerarDictamenComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class ServiciosExtraordinariosRoutingModule {}
