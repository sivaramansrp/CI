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
    path: 'permiso-sanitario-importacion',
    loadChildren: () =>
      import('./tramites/260215/permiso-sanitario-importacion.module').then(
        (m) => m.PermisoSanitarioImportacionModule
      ),
  },
  {
    path: 'aviso-de-modificacion-module',
    loadChildren: () =>
      import('./tramites/260605/pantallas.module').then(
        (m) => m.Pantallas260605Module
      ),
  },
  {
    path: 'importacion-productos',
    loadChildren: () =>
      import('./tramites/260101/importacion-productos.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'aviso-sanitario',
    loadChildren: () =>
      import('./tramites/260601/aviso-sanitario.module').then(
        (m) => m.AvisoSanitarioModule
      ),
  },

  {
    path: 'dispositivos-medicos-sin-registrar',
    loadChildren: () =>
      import('./tramites/260217/importacion-dispositivos-mediocos-sin-registrar.module').then(
        (m) => m.ImportacionDispositivosMedicosSinRegistrarModule
      ),
  },

  {
    path: 'materias-primas-destinados',
    loadChildren: () =>
      import('./tramites/260205/materias-primas-destinados.module').then(
        (m) => m.MateriasPrimasDestinadosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
