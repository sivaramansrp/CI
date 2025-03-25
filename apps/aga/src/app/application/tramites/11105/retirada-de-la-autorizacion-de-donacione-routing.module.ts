import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'solicitud',
    component: SolicitantePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_TERRESTRE)],
  exports: [RouterModule],
})
export class TransportistaTerrestreRoutingModule {}
