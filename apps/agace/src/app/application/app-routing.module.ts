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
    path: 'registros-de-comercio-exterior',
    loadChildren: () =>
      import(
        './tramites/31602/comercio-exterior/comercio-exterior.module'
      ).then((m) => m.ComercioExteriorModule),
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
        (m) => m.AvisoUnicoRenovacionModule
      ),
  },
  {
    path: 'registro-solicitud',
    loadChildren: () =>
      import('./tramites/31802/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule
      ),
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
      import('./tramites/32401/manifiesto-aereo.module').then(
        (m) => m.ManifiestoAereoModule
      ),
  },
  {
    path: 'consulta-aviso-acreditacion',
    loadChildren: () =>
      import('./tramites/32101/Consulta-Aviso-Acreditacion.module').then(
        (m) => m.ConsultaAvisoAcreditacionModule
      ),
  },
  {
    path: 'aviso-traslado',
    loadChildren: () =>
      import('./tramites/32503/aviso-traslado.module').then(
        (m) => m.AvisoTrasladoModule
      ),
  },
  {
    path: 'aviso-destruccion',
    loadChildren: () =>
      import('./tramites/32506/aviso-destruccion.module').then(
        (m) => m.AvisoDestruccionModule
      ),
  },
  {
    path: 'aviso-procesos-solicitante',
    loadChildren: () =>
      import('./tramites/32505/aviso-procesos.module').then(
        (m) => m.AvisoProcesosModule
      ),
  },
  {
    path: 'adace',
    loadChildren: () =>
      import('./tramites/32508/adace.module').then((m) => m.AdaceModule),
  },
  {
    path: 'anexo-veintiocho',
    loadChildren: () =>
      import('./tramites/32201/anexo-veintiocho.module').then(
        (m) => m.AnexoVeintiochoModule
      ),
  },
  {
    path: 'endoso-garantia',
    loadChildren: () =>
      import('./tramites/31301/endoso-garantia.module').then(
        (m) => m.EndosoGarantiaModule
      ),
  },
  {
    path: 'aviso-de-ampliacion',
    loadChildren: () =>
      import('./tramites/32102/Aviso-De-Ampliacion.module').then(
        (m) => m.AvisoDeAmpliacionModule
      ),
  },
  {
    path: 'renovacion-comercializadora',
    loadChildren: () =>
      import('./tramites/31801/renovacion-comercializadora.module').then(
        (m) => m.RenovacionComercializadoraModule
      ),
  },
  {
    path: 'garantia',
    loadChildren: () =>
      import('./tramites/31101/garantia.module').then(
        (m) => m.GarantiaModule
      ),
  },
  {
    path: 'aviso-opcion-seguro-global',
    loadChildren: () =>
      import('./tramites/32515/aviso-opcion-seguro-global.module').then(
        (m) => m.AvisoOpcionSeguroGlobalModule),
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
