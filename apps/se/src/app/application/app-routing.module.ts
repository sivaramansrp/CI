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
    path: 'octava-temporal',
    loadChildren: () =>
      import('./tramites/130102/octava-temporal.module').then(
        (m) => m.OctavaTemporalModule
      ),
  },
  {
    path: 'entidad-legal',
    loadChildren: () =>
      import('./tramites/120404/entidad-legal.module').then(
        (m) => m.EntidadLegalModule
      ),
  },

  {
    path: 'exportador-autorizado',
    loadChildren: () =>
      import('./tramites/110102/exportador-autorizado.module').then(
        (m) => m.ExportadorautorizadoModule
      ),
  },
  {
    path: 'solicitartransferencia',
    loadChildren: () =>
      import('./tramites/120501/solicitar-transferencia-cupos.module').then(
        (m) => m.SolicitarTransferenciaCuposModule
      ),
  },
  {
    path: 'registro-como-empresa',
    loadChildren: () =>
      import('./tramites/120601/registro-como-empresa.module').then(
        (m) => m.RegistroComoEmpresaModule
      ),
  },
  {
    path: 'empresa-frontera',
    loadChildren: () =>
      import('./tramites/120602/empresa-frontera-solicitud.module').then(
        (m) => m.EmpresaFronteraSolicitudModule
      ),
  },
  {
    path: 'prosec-modificacion',
    loadChildren: () =>
      import('./tramites/90305/prosec-modificacion.module').then(
        (m) => m.ProsecModificacionModule
      ),
  },
  {
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/110101/pantallas/pantallas.module').then(
        (m) => m.Pantallas110101Module
      ),
  },
  {
    path: 'asignacion-directa-de-cupo',
    loadChildren: () =>
      import('./tramites/120402/asignacion-directa-de-cupo.module').then(
        (m) => m.AsignacionDirectaDeCupoModule
      ),
  },
  {
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/130118/pexim.module').then((m) => m.PeximModule),
  },
  {
    path: 'expansion-de-productores',
    loadChildren: () =>
      import(
        './tramites/90201/expansion-de-productores/expansion-de-productores.module'
      ).then((m) => m.ExpansionDeProductoresModule),
  },
  {
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/110204/pexim.module').then((m) => m.PeximModule),
  },
  {
    path: 'elegibilidad-de-textiles',
    loadChildren: () =>
      import('./tramites/120301/elegibilidad-de-textiles.module').then(
        (m) => m.ElegibilidadDeTextilesModule
      ),
  },
  {
    path: 'permiso-importacion',
    loadChildren: () =>
      import('./tramites/130120/permiso-importacion.module').then(
        (m) => m.PermisoImportacionModule
      ),
  },
  {
    path: 'cancelacion-de',
    loadChildren: () =>
      import('./tramites/140103/cancelacion-de.module').then(
        (m) => m.CancelacionDeModule
      ),
  },
  {
    path: 'desmantelar',
    loadChildren: () =>
      import('./tramites/130106/desmantelar.module').then(
        (m) => m.DesmantelarModule)
  },
  {
    path: 'desistimiento-de-permiso',
    loadChildren: () =>
      import('./tramites/140105/desistimiento-de-permiso.module').then(
        (m) => m.DesistimientoDePermisoModule)
  },
  {
    path: 'certificado-sgp',
    loadChildren: () =>
      import('./tramites/110209/certificado-sgp.module').then(
        (m) => m.CertificadoSGPModule
      ),
  },
  {
    path: 'certificado-registro',
    loadChildren: () =>
      import('./tramites/80205/certificado-registro.module').then(
        (m) => m.CertificadoRegistroModule
      ),
  },
  {
    path: 'certificado-registro',
    loadChildren: () =>
      import('./tramites/80205/certificado-registro.module').then(
        (m) => m.CertificadoRegistroModule
      ),
  },
  {
    path: 'subfabricante-immex',
    loadChildren: () =>
      import('./tramites/80207/subfabricante-extension.module').then(
        (m) => m.SubfabricanteExtentionModule
      ),
  },
  {
    path: 'immex-ampliacion-sensibles',
    loadChildren: () =>
      import('./tramites/80202/immex-ampliacion-sensibles.module').then(
        (m) => m.ImmexAmpliacionSensiblesModule
      ),
  },
  {
    path: 'immex-registro-solicitud-modality',
    loadChildren: () =>
      import(
        './tramites/80203/immex-registro-de-solicitud-modalidad.modulo'
      ).then((m) => m.ImmexRegistroDeSolicitudModalityModule),
  },
  {
    path: 'modificacion',
    loadChildren: () =>
      import('./tramites/80308/modificacion-solicitud.module').then(
        (m) => m.ModificacionSolicitudModule
      ),
  },
  {
    path: 'autorizacion-prosec',
    loadChildren: () =>
      import('./tramites/90101/autorizacion-prosec.module').then(
        (m) => m.AutorizacionProsecModule
      ),
  },
  {
    path: 'solicitud-modalidad',
    loadChildren: () =>
      import('./tramites/80208/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule
      ),
  },
  {
    path: 'exportacion-minerales',
    loadChildren: () =>
      import('./tramites/130202/exportacion-minerales-de-hierro.module').then(
        (m) => m.ExportacionMineralesDeHierroModule
      ),
  },
  {
    path: 'cancelaciones-ministerio',
    loadChildren: () =>
      import('./tramites/140201/cancelaciones.module').then(
        (m) => m.CancelacionesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
