import { RouterModule, Routes } from '@angular/router';
import { DesistirSolicitudInformacionHistoricaComponent } from './pages/desistir-solicitud-informacion-historica/desistir-solicitud-informacion-historica.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'desistir-informacion-historica',
    component: DesistirSolicitudInformacionHistoricaComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'desistir-informacion-historica'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DesistirSolicitudInformacionHistoricaRoutingModule { }
