import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'permiso-ordinario-importacion-armas-municiones',
    loadChildren: () =>
      import(
        './tramites/240101/permiso-ordinario-importacion-armas-municiones.module'
      ).then((m) => m.PermisoOrdinarioImportacionArmasMunicionesModule),
  },
  {
    path: 'importacion-de-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240111/importacion-de-material-explosivo.module'
      ).then((m) => m.ImportacionDeMaterialExplosivoModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
