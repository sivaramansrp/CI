import { RouterModule, Routes } from '@angular/router';
import { ExpedicionCertificadosFronteraComponent } from './pages/expedicion-certificados-frontera/expedicion-certificados-frontera.component';
import { NgModule } from '@angular/core';

const EXPEDICION_CERTIFICADOS_FRONTERA: Routes = [
  {
    path: 'solicitante',
    component: ExpedicionCertificadosFronteraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(EXPEDICION_CERTIFICADOS_FRONTERA)],
  exports: [RouterModule],
})
export class ExpedicionCertificadosFronteraRoutingModule {}
