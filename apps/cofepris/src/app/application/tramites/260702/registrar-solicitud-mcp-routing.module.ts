import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { AcusePageComponent } from '@libs/shared/data-access-user/src/tramites/pages/acuse-page/acuse-page.component';
import { PaginaDosAcusesYResolucionesFolioDelTramiteDetallesComponent } from './pages/pagina-dos-acuses-y-resoluciones-folio-del-tramite-detalles/pagina-dos-acuses-y-resoluciones-folio-del-tramite-detalles.component';
import { PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent } from './pages/pagina-uno-acuses-y-resoluciones-folio-del-tramite-busqueda/pagina-uno-acuses-y-resoluciones-folio-del-tramite-busqueda.component';
import { PagoDeDerechoComponent } from './components/pagodederechos/pago-de-derecho.component';

const routes: Routes = [

  {
    path: 'registro',
    component: RegistroPageComponent,
   },
   {
    path: 'pagina-uno-acuses-y-resoluciones-busqueda',
    component: PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent,
  },

  {
    path: 'pagina-dos-acuses-y-resoluciones-detalles',
    component: PaginaDosAcusesYResolucionesFolioDelTramiteDetallesComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registro', // Redirect to pagodederechos by default
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarSolicitudMCPRoutingModule { }
