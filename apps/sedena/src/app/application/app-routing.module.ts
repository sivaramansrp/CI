import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'aviso-importacion-sustancias-quimicas',
    loadChildren: () =>
      import(
        './tramites/240106/aviso-importacion-sustancias-quimicas.module'
      ).then((m) => m.AvisoImportacionSustanciasQuimicasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
