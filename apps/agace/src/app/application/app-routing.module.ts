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
    path: 'antecesor',
    loadChildren: () =>
      import('./tramites/31601/antecesor/antecesor.module').then(
        (m) => m.AntecesorModule
      ),
  },
  {
    path: 'aviso',
    loadChildren: () =>
      import('./tramites/32502/aviso.module').then((m) => m.AvisoModule),
  },
  {
    path: 'aviso-procesos',
    loadChildren: () =>
      import('./tramites/32504/aviso-procesos.module').then(
        (m) => m.AvisoProcesosModule
      ),
  },
  {
    path: 'aviso-unico-renovacion',
    loadChildren: () =>
      import('./tramites/317/aviso-unico-renovacion.module').then(
        (m) => m.AvisoUnicoRenovacionModule)
      },
      {
    path: 'registro-solicitud',
    loadChildren: () =>
      import('./tramites/31802/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule),
   },
  {
    path: 'autoridad',
    loadChildren: () =>
      import('./tramites/31501/autoridad.module').then(
        (m) => m.AutoridadModule
      ),
  },
  {
    path: 'registro-solicitud',
    loadChildren: () =>
      import('./tramites/31803/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule
      ),
  },
  {
    path: 'mercancias-desmontadas-o-sin-montar',
    loadChildren: () =>
      import(
        './tramites/32501/mercancias-desmontadas-o-sin-montar.module'
      ).then((m) => m.MercanciasDesmontadasOSinMontarModule),
  },
  {
    path: 'manifiesto-aereo',
    loadChildren: () =>
      import(
        './tramites/32401/manifiesto-aereo.module'
      ).then((m) => m.ManifiestoAereoModule),
  },
  {
    path: 'aviso-traslado',
    loadChildren: () =>
      import('./tramites/32503/aviso-traslado.module').then(
        (m) => m.AvisoTrasladoModule
      ),
  },
  {
    path: 'aviso',
    loadChildren: () =>
      import('./tramites/32301/aviso-modify-ivaEIepsAgace.module').then(
        (m) => m.AvisoModifyIvaElepsAgaceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
