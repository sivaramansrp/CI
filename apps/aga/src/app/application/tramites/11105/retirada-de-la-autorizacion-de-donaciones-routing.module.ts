import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import {} from '@libs/shared/data-access-user/src';
import { AcusesYResolucionesBuscar11105Component } from './pages/acuses-y-resoluciones-buscar-11105/acuses-y-resoluciones-buscar-11105.component';
import { AcusesYResolucionesDetalles11105Component } from './pages/acuses-y-resoluciones-detalles-11105/acuses-y-resoluciones-detalles-11105.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'solicitud',
    component: SolicitantePageComponent,
  },
  {
    path: 'acuses-y-resoluciones-buscar-11105',
    component: AcusesYResolucionesBuscar11105Component,
  },

  {
    path: 'acuses-y-resoluciones-detalles-11105',
    component: AcusesYResolucionesDetalles11105Component,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'acuses-y-resoluciones-folio-del-tramite',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_TERRESTRE)],
  exports: [RouterModule],
})
export class RetiradaDeLaAutorizacionDeDonacioneRoutingModule {}
