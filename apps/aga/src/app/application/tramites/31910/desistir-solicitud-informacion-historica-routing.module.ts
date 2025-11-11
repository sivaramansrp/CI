import { RouterModule, Routes } from '@angular/router';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';
import { DesistirSolicitudInformacionHistoricaComponent } from './pages/desistir-solicitud-informacion-historica/desistir-solicitud-informacion-historica.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'desistir-informacion-historica',
    component: DesistirSolicitudInformacionHistoricaComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'desistir-informacion-historica',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DesistirSolicitudInformacionHistoricaRoutingModule {}
