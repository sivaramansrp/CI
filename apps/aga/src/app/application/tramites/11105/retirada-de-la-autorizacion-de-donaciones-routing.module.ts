import { RouterModule, Routes } from '@angular/router';
import { AcusesYResolucionesBusqueda11105Component } from './pages/acuses-y-resoluciones-busqueda-11105/acuses-y-resoluciones-busqueda-11105.component';
import { AcusesYResolucionesDetalles11105Component } from './pages/acuses-y-resoluciones-detalles-11105/acuses-y-resoluciones-detalles-11105.component';
import { NgModule } from '@angular/core';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'solicitud',
    component: SolicitantePageComponent,
  },
  {
    path: 'acuses-y-resoluciones-busqueda-11105',
    component: AcusesYResolucionesBusqueda11105Component,
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
