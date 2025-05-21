import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'permiso-de-exportacion',
    loadChildren: () =>
      import('./tramites/280101/permiso-de-exportacion.module').then(
        (m) => m.PermisoDeExportacionModule
      ),
  },
  {
    path: 'evaluar',
    loadComponent: () =>
      import('./evaluar/evaluar.component').then((m) => m.EvaluarComponent),
  },
  {
    path: 'autorizar',
    loadComponent: () =>
      import('./autorizar/autorizar.component').then(
        (m) => m.AutorizarComponent
      ),
  },
  {
    path: 'subsecuentes',
    loadComponent: () =>
      import(
        './subsecuentes/acuses-y-resoluciones-folio-del-tramite-detalles-contenedor/acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component'
      ).then(
        (m) => m.AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
