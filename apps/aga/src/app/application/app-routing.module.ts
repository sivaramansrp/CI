import { FirmaPageComponent } from '@ng-mf/data-access-user';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
import { NotificacionPageComponent } from './notificaciones/notificacion-page/notificacion-page.component';
import { AcusePageComponent } from './acuse/acuse-page/acuse-page.component';


const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
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
    path: 'despacho-mercancias',
    loadChildren: () =>
      import('./tramites/303/despacho-mercancias.module').then(
        (m) => m.DespachoMercanciasModule
      ),
  },
  {
    path: 'importante',
    loadChildren: () =>
      import('./tramites/301/pantallas.module').then((m) => m.Pantallas301Module),
  },
  {
    path: 'importador-exportador',
    loadChildren: () =>
      import('./tramites/10301/importador-exportador.module').then(
        (m) => m.ImportadorExportadorModule
      ),
    path: 'atender-requerimientos',
    loadChildren: () => import('./atencion-requerimientos/atencion-requerimientos.module').then(
      (m) => m.AtencionRequerimientosModule
    ),
  },
  {
    path: 'notificacion',
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
export class AppRoutingModule { }
