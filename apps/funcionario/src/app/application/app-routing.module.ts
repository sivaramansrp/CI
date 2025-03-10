import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { NotificacionPageComponent } from './notificaciones/notificacion-page/notificacion-page.component';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';
import { FirmaPageComponent } from './notificaciones/firma-page/firma-page.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-seleccion-modulo' },
  {
    path: 'app-seleccion-modulo',
    component: SeleccionModuloComponent
  },
  {
    path: 'operacion-funcionario',
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
  }

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
