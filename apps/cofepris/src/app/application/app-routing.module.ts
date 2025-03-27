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
    path: 'permiso-maquila',
    loadChildren: () =>
      import('./tramites/260212/permiso-maquila.module').then(
        (m) => m.PermisoMaquilaModule
      ),
  },
  {
    path: 'permiso-sanitario-importacion-medicamentos',
    loadChildren: () =>
      import(
        './tramites/260204/permiso-sanitario-importacion-medicamentos.module'
      ).then((m) => m.PermisoSanitarioImportacionMedicamentosModule),
  },
  {
    path: 'permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260211/permiso-sanitario.module').then(
        (m) => m.PermisoSanitarioModule
      ),
  },
  {
    path: 'importacion-dispositivos-medicos-uso',
    loadChildren: () =>
      import('./tramites/260214/importacion-dispositivos-mediocos-uso.module').then(
        (m) => m.ImportacionDispositivosMedicosUsoModule)
  },
  {
    path: 'permiso-sanitario-importacion',
    loadChildren: () =>
      import('./tramites/260215/permiso-sanitario-importacion.module').then(
        (m) => m.PermisoSanitarioImportacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
