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
    path: 'antecesor',
    loadChildren: () =>
      import('./tramites/31601/antecesor/antecesor.module').then(
        (m) => m.AntecesorModule
      ),
  },
  {
    path: 'aviso',
    loadChildren: () =>
      import('./tramites/32502/aviso.module').then(
        (m) => m.AvisoModule
      ),
  },
  {
    path: 'aviso-procesos',
    loadChildren: () =>
      import('./tramites/32504/aviso-procesos.module').then(
        (m) => m.AvisoProcesosModule
      ),
  },
  {
    path: 'aviso',
    loadChildren: () =>
      import('./tramites/32301/aviso-modify-ivaEIepsAgace.module').then(
        (m) => m.AvisoModifyIvaElepsAgaceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
