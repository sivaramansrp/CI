import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';
import { IniciarTramiteResolver } from '@libs/shared/data-access-user/src';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cupos-solicitud-transferencia'
  },
  {
    canActivate: [IniciarTramiteResolver],
    data: {
      iniciarConfig: {
        procedureId: '150102',
      },
    },
    path: 'cupos-solicitud-transferencia',
    component: SolicitarTransferenciaCuposMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitarTransferenciaCuposRoutingModule { }