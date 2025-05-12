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
    path: 'cafe-exportadores',
    loadChildren: () =>
      import('./tramites/290101/nacional-cafe-exportadores.module').then(
        (m) => m.NacionalCafeExportadoresModule
      )
  },
  {
    path: 'registrar-solicitud',
    loadChildren: () => import('./tramites/290201/registrar-solicitud/registrar-solicitud.module').then(
      (m) => m.RegistrarSolicitudModule
    )
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}