import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';
const routes: Routes = [
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
    path: 'exportador-autorizado',
    loadChildren: () =>
      import('./tramites/110102/exportador-autorizado.module').then(
        (m) => m.ExportadorautorizadoModule
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
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/130118/pexim.module').then((m) => m.PeximModule),
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
    path: 'certificado-registro',
    loadChildren: () =>
      import('./tramites/80205/certificado-registro.module').then(
        (m) => m.CertificadoRegistroModule)
  },
  {
    path: 'certificado-registro',
    loadChildren: () =>
      import('./tramites/80205/certificado-registro.module').then(
        (m) => m.CertificadoRegistroModule)
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
    path: 'modificacion',
    loadChildren: () =>
      import('./tramites/80308/modificacion-solicitud.module').then(
        (m) => m.ModificacionSolicitudModule
      ),
  },

  {
    path: 'solicitud-modalidad',
    loadChildren: () =>
      import('./tramites/80208/registro-solicitud.module').then(
        (m) => m.RegistroSolicitudModule
      ),
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
