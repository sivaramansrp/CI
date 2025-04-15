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
    path: 'registro-solicitud',
    loadChildren: () =>
      import('./tramites/31803/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule),
      },{
        
    path: 'mercancias-desmontadas-o-sin-montar',
    loadChildren: () =>
      import('./tramites/32501/mercancias-desmontadas-o-sin-montar.module').then(
        (m) => m.MercanciasDesmontadasOSinMontarModule
      ),
  },

  {
        
    path: 'entrega-acta-solicitante',
    loadChildren: () =>
      import('./tramites/32507/entrega-acta.module').then(
        (m) => m.EntregaActaModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
