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
    path: 'aviso-siglos',
    loadChildren: () =>
      import('./tramites/270201/aviso-siglos.module').then(
        (m) => m.AvisoSiglosModule
      ),
  },
  {
    path: 'aviso-importacion-plastica',
    loadChildren: () =>
      import('./tramites/270301/aviso-importacion-plastica.module').then(
        (m) => m.AvisoImportacionPlasticaModule
      ),
  },
  {
    path: 'informacion-arte-exportar',
    loadChildren: () =>
      import('./tramites/270101/exportar-ilustraciones.module').then(
        (m) => m.ExportarIlustracionesModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
