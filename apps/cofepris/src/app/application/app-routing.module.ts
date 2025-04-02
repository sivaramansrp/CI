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
    path: 'mod-permiso-importacion',
    loadChildren: () =>
      import('./tramites/260912/mod-permiso-importacion.module').then(
        (m) => m.ModPermisoImportacionModule
      ),
  },
  {
    path: 'modificación-del-permiso-sanitario-de-importación-de-insumos',
    loadChildren: () =>
      import(
        './tramites/260904/modificación-del-permiso-sanitario-de-importación-de-insumos.module'
      ).then(
        (m) => m.ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosModule
      ),
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
    path: 'modificación-del-permiso-sanitario-de-importación-de-insumos',
    loadChildren: () =>
      import(
        './tramites/260904/modificación-del-permiso-sanitario-de-importación-de-insumos.module'
      ).then(
        (m) => m.ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosModule
      ),
  },
  {
    path: 'permiso-plaguicidas',
    loadChildren: () =>
      import('./tramites/260501/permiso-plaguicidas-importacion.module').then(
        (m) => m.PermisoPlaguicidasImportacionModule
      ),
  },
  {
    path: 'permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260211/permiso-sanitario.module').then(
        (m) => m.PermisoSanitarioModule
      ),
  },
  {
    path: 'importacion-psicotropicos',
    loadChildren: () =>
      import(
        './tramites/260303/certificados-licencias-permisos/certificados-licencias-permisos.module'
      ).then((m) => m.CertificadosLicenciasPermisosModule),
  },
  {
    path: 'importacion-dispositivos-medicos-uso',
    loadChildren: () =>
      import(
        './tramites/260214/importacion-dispositivos-medicos-uso.module'
      ).then((m) => m.ImportacionDispositivosMedicosUsoModule),
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
    path: 'materias-primas-destinados',
    loadChildren: () =>
      import('./tramites/260205/materias-primas-destinados.module').then(
        (m) => m.MateriasPrimasDestinadosModule
      ),
  },
  {
    path: 'importacion-dispositivos-medicos-donacion',
    loadChildren: () =>
      import(
        './tramites/260216/importacion-dispositivos-medicos-donacion.module'
      ).then((m) => m.ImportacionDispositivosMedicosDonacionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
