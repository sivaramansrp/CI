import { RouterModule, Routes } from '@angular/router';
import { CancelarReporteComponent } from './pages/cancelar-reporte/cancelar-reporte.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: '',
    component: CancelarReporteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class CancelarSolicitudReporteMensualRoutingModule {}
