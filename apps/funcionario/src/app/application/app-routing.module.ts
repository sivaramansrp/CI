import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { FirmaPageComponent } from '@libs/shared/data-access-user/src';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-seleccion-modulo' },
  {
    path: 'app-seleccion-modulo',
    component: SeleccionModuloComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
  },
  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./notificaciones/notificaciones.module').then(
        (m) => m.NotificacionesModule
      ),
  },
  { path: 'firma-electronica',
    component: FirmaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
