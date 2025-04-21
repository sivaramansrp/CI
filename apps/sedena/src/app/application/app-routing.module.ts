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
    path: 'permiso-ordinario-importacion-armas-municiones',
    loadChildren: () =>
      import(
        './tramites/240101/permiso-ordinario-importacion-armas-municiones.module'
      ).then((m) => m.PermisoOrdinarioImportacionArmasMunicionesModule),
  },
  {
    path: 'permiso-ordinario-exportacion-de-sustancias-quimicas',
    loadChildren: () =>
      import(
        './tramites/240117/permiso-ordinario-para-la-exportacion-de-sustancias-quimicas.module'
      ).then((m) => m.PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasModule),
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
