import { RouterModule, Routes } from '@angular/router';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';
import { DesistirSolicitudInformacionHistoricaComponent } from './pages/desistir-solicitud-informacion-historica/desistir-solicitud-informacion-historica.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: '',
    component: DesistirSolicitudInformacionHistoricaComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DesistirSolicitudInformacionHistoricaRoutingModule {}
