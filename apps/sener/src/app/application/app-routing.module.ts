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
    path:'producto-petrolifero',
    loadChildren: () => import('./tramites/130108/importacion-producto-petrolifero.module').then(m => m.ImportacionProductoPetroliferoModule)
  },
  {
    
    path: 'hidrocarburos-de-petroleo',
    loadChildren: () =>
      import('./tramites/140112/retiro-importacion-exportacion-permiso.module').then(
        (m) => m.RetiroImportacionExportacionPermisoModule
      ),
  },
  {
    path: 'renuncia-de-derechos-de-permisos',
    loadChildren: () =>
      import('./tramites/140111/renuncia-de-derechos-de.module').then(
        (m) => m.RenunciaDeDerechosDeModule
      ),
  },
  {
    path: 'permiso-de-hidrocarburos',
    loadChildren: () =>
      import('./tramites/130121/permiso-de-hidrocarburos.module').then(
        (m) => m.PermisoDeHidrocarburosModule
      )
  },
  {
    path: 'exportacion-hidrocarburos',
    loadChildren: () =>
      import('./tramites/130204/exportacion-hidrocarburos.module').then(
        (m) => m.ExportacionHidrocarburosModule
      ),
  },
  {
    path: 'autorizacion-de-rayos-x',
    loadChildren: () =>
      import('./tramites/300105/autorizacion-de-rayos-x.module').then(
        (m) => m.AutorizacionDeRayosXModule
      ),
  },
  {
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/140216/suspension-permiso.module').then(
        (m) => m.SuspensionPermisoModule
      )
  },
  {
    path: 'exportacion-petroliferos',
    loadChildren: () =>
      import('./tramites/130201/exportacion-petroliferos.module').then(
        (m) => m.ExportacionPetroliferosModule
      ),
  },
  {
    path: 'parmiso-importacion-petroleo',
    loadChildren: () =>
      import('./tramites/130302/permiso-importacion-petroleo.module').then(
        (m) => m.PermisoImportacionPetroleoModule
      ),
  },
  {
    path: 'renuncia-de-permiso',
    loadChildren: () =>
      import('./tramites/140218/renuncia-de-permiso.module').then(
        (m) => m.RenunciaDePermisoModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
