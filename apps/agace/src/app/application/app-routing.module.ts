import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' }, // Choose default as per requirement
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
