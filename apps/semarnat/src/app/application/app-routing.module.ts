import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent
  },
  {
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/230401/pantallas-modulo.module').then((m) => m.PantallasModuloModule),
  },
  {
    path: 'tramites-disponibles',
    loadChildren: () =>
      import('./tramites/230101/tramites-disponsibles.module').then((m) => m.TramitesDisponiblesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
