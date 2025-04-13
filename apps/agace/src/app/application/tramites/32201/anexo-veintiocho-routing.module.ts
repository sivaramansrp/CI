import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
// import { PaginaUnoAcusesYResolucionesBusquedaComponent } from './pages/pagina-uno-acuses-y-resoluciones-busqueda/pagina-uno-acuses-y-resoluciones-busqueda.component';

const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  }
  // {
  //   path: 'pagina-uno-acuses-y-resoluciones-busqueda',
  //   component: PaginaUnoAcusesYResolucionesBusquedaComponent,
  // },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'pagina-uno-acuses-y-resoluciones-busqueda',
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexoVeintiochoRoutingModule { }
