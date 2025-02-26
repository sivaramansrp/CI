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
    path: 'octava-temporal',
    loadChildren: () =>
      import('./tramites/130102/octava-temporal.module').then(
        (m) => m.OctavaTemporalModule
      ),
  },
  {
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/110101/pantallas/pantallas.module').then(
        (m) => m.Pantallas110101Module
      ),
  },
  {
    path: 'asignacion-directa-de-cupo',
    loadChildren: () =>
      import('./tramites/120402/asignacion-directa-de-cupo.module').then(
        (m) => m.AsignacionDirectaDeCupoModule
      ),
  },
  {
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/130118/pexim.module').then((m) => m.PeximModule),
  },
  {
    path: 'elegibilidad-de-textiles',
    loadChildren: () =>
      import('./tramites/120301/elegibilidad-de-textiles.module').then(
        (m) => m.ElegibilidadDeTextilesModule
      ),
  },
  {
    path: 'permiso-importacion',
    loadChildren: () =>
      import('./tramites/130120/permiso-importacion.module').then(
        (m) => m.PermisoImportacionModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
