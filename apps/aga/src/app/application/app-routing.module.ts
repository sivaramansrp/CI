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
    path: 'servicios-extraordinarios',
    loadChildren: () =>
      import('./tramites/5701/servicios-extraordinarios.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'despacho-mercancias',
    loadChildren: () =>
      import('./tramites/303/despacho-mercancias.module').then(
        (m) => m.DespachoMercanciasModule
      ),
  },
  {
    path: 'importante',
    loadChildren: () =>
      import('./tramites/301/pantallas.module').then(
        (m) => m.Pantallas301Module
      ),
  },
  {
    path: 'retorno-contenedores',
    loadChildren: () =>
      import('./tramites/11202/retorno-contenedores.module').then(
        (m) => m.RetornoContenedoresModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
