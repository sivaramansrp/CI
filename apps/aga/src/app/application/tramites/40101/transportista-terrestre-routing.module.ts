import { ChoferesComponent } from './components/choferes/choferes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'solicitante',
    component: SolicitantePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitante',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_TERRESTRE)],
  exports: [RouterModule],
})
export class TransportistaTerrestreRoutingModule {}
