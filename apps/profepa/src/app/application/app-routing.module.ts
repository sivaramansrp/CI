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
    path: 'flora-fauna',
    loadChildren: () =>
      import('./tramites/250101/flora-fauna.module').then(
        (m) => m.FloraFaunaModule
      ),
  },
  {
    path: 'flora-fauna-silvestre',
    loadChildren: () =>
      import('./tramites/250102/flora-fauna.module').then(
        (m) => m.FloraFaunaModule
      ),
  },
  {
    path: 'evaluar',
    loadComponent: () =>
      import('./evaluar/evaluar.component').then((m) => m.EvaluarComponent),
  },
  {
    path: 'autorizar',
    loadComponent: () =>
      import('./autorizar/autorizar.component').then(
        (m) => m.AutorizarComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}