import { NgModule } from '@angular/core';
import { PaginaDosAcusesYResolucionesDetallesComponent } from './pages/pagina-dos-acuses-y-resoluciones-detalles/pagina-dos-acuses-y-resoluciones-detalles.component';
import { PaginaUnoAcusesYResolucionesBusquedaComponent } from './pages/pagina-uno-acuses-y-resoluciones-busqueda/pagina-uno-acuses-y-resoluciones-busqueda.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

export const ROUTES_SOLICITUDES: Routes = [
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
    path: '',
    pathMatch: 'full',
    redirectTo: 'pagina-uno-acuses-y-resoluciones-busqueda',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class EndosoGarantiaRoutingModule {}
