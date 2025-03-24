import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'retirada-de-la-autorización-de-donacione',
    component: SolicitantePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_TERRESTRE)],
  exports: [RouterModule],
})
export class TransportistaTerrestreRoutingModule {}
