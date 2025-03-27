import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//import { FolioDelTramiteComponent } from './pages/folio-del-trámite/folio-del-trámite.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { AcusesYResolucionesComponent } from './pages/acuses-y-resoluciones/acuses-y-resoluciones.component';
import { FolioDelTramiteComponent } from './pages/folio-del-trámite/folio-del-trámite.component';

export const ROUTES_TERRESTRE: Routes = [
  {
    path: 'solicitud',
    component: SolicitantePageComponent,
  },

  {
    path: 'acuses-y-resoluciones',
    component: AcusesYResolucionesComponent,
  },

  {
    path: 'folio-del-trámite',
    component: FolioDelTramiteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_TERRESTRE)],
  exports: [RouterModule],
})
export class RetiradaDeLaAutorizacionDeDonacioneRoutingModule {}
