/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'soltracupos',
  },
  {
    path: 'soltracupos',
    component: SolicitarTransferenciaCuposMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitarTransferenciaCuposRoutingModule { }