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
    path: 'modificación-del-permiso-sanitario-de-importación-de-insumos',
    loadChildren: () =>
      import('./tramites/260904/modificación-del-permiso-sanitario-de-importación-de-insumos.module').then(
        (m)=> m.ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
