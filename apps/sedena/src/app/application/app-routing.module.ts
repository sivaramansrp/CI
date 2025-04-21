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
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
