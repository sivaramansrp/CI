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
    path: 'aviso-de-importacion',
    loadChildren: () => import('./tramites/260603/aviso-de-importacion.module').then(m => m.AvisoDeImportacionModule)  
  },
  { path: 'aviso-exportacion',
    loadChildren: () =>
      import('./tramites/260604/aviso-exportacion.module').then(
        (m) => m.AvisoExportacionModule)
      },
  {
    path: 'permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260211/permiso-sanitario.module').then(
        (m) => m.PermisoSanitarioModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
