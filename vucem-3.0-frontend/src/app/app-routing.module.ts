import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent
  },
  {
    path: 'servicios-extraordinarios',
    loadChildren: () =>
      import('./tramites/5701/servicios-extraordinarios.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'extensión-emisión',
    loadChildren: () =>
      import('./tramites/220201/Módulo-de-modificación-de -extensión-de-emisión.module').then(
        (m) => m.EmisiónExtensiónModificaciónModule)
  },
  {
    path: 'pantallas-extraordinarios',
    loadChildren: () =>
      import('./tramites/220401/pantallas.module').then(
        (m) => m.PantallasModule
      ),
  },
  {
    path: 'despacho-mercancias',
    loadChildren: () =>
      import('./tramites/303/despacho-mercancias.module').then(
        (m) => m.DespachoMercanciasModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
