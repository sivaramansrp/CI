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
    path: 'permiso-ordinario-importacion-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240108/permiso-ordinario-importacion-exlposivo.module'
      ).then((m) => m.PermisoOrdinarioImportacionExlposivoModule),
  },
  {
    path: 'permiso-ordinario',
    loadChildren: () =>
      import(
        './tramites/240308/solicitude-de-artificios-pirotecnicos.module'
      ).then((m) => m.SolicitudeDeArtificiosPirotecnicosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
