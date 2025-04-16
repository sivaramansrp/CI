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
    path: 'artefactos-pirotecnicos-ordinarios',
    loadChildren: () =>
      import(
        './tramites/240119/artefactos-pirotecnicos-ordinarios.module'
      ).then((m) => m.ArtefactosPirotecnicosOrdinariosModule),
  },
  {
    path: 'permiso-extraordinario-para',
    loadChildren: () =>
      import(
        './tramites/240118/permiso-extraordinario-para-module'
      ).then((m) => m.PermisoExtraordinarioParaModule),
  },
  {
    path: 'permiso-ordinario-importacion-armas-municiones',
    loadChildren: () =>
      import(
        './tramites/240101/permiso-ordinario-importacion-armas-municiones.module'
      ).then((m) => m.PermisoOrdinarioImportacionArmasMunicionesModule),
  },
  {
    path: 'permiso-ordinario-importacion-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240108/permiso-ordinario-importacion-exlposivo.module'
      ).then((m) => m.PermisoOrdinarioImportacionExlposivoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
