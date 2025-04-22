import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SolicitudDeReporteComponent } from './pages/solicitud-de-reporte/solicitud-de-reporte.component';

const ROUTES: Routes = [
  {
    path: 'solicitud-de-reporte',
    component: SolicitudDeReporteComponent,
   },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InformeAnualProgramaRoutingModule { }
