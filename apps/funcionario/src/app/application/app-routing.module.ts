import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';
import { NotificacionPageComponent } from './notificaciones/notificacion-page/notificacion-page.component';
import { AcusePageComponent, FirmaPageComponent } from '@libs/shared/data-access-user/src';

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
    component: NotificacionPageComponent
  },
  {
    path: 'firmar',
    component: FirmaPageComponent
  },
  {
    path: 'acuse',
    component: AcusePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
