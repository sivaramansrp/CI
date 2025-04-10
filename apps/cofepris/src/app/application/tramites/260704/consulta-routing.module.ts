import { RouterModule, Routes } from '@angular/router';
import { AcusePageComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PaginaDosAcusesYResolucionesDetallesComponent } from './pages/pagina-dos-acuses-y-resoluciones-detalles/pagina-dos-acuses-y-resoluciones-detalles.component';
import { PaginaUnoAcusesYResolucionesBusquedaComponent } from './pages/pagina-uno-acuses-y-resoluciones-busqueda/pagina-uno-acuses-y-resoluciones-busqueda.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: 'pagina-uno-acuses-y-resoluciones-busqueda',
    component: PaginaUnoAcusesYResolucionesBusquedaComponent,
  },

  {
    path: 'pagina-dos-acuses-y-resoluciones-detalles',
    component: PaginaDosAcusesYResolucionesDetallesComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ConsultaRoutingModule {}
