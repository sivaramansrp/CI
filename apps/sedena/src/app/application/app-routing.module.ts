import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'permiso-extraordinario-para-la-exportacion-de-sustancias-quimicas',
    loadChildren: () =>
      import(
        './tramites/240118/permiso-extraordinario-para-la-exportacion-de-sustancias-quimicas.module'
      ).then(
        (m) =>
          m.PermisoExtraordinarioParaLaExportacionDeSustanciasQuimicasModule
      ),
  },
  {
    path: 'permiso-ordinario-importacion-armas-municiones',
    loadChildren: () =>
      import(
        './tramites/240101/permiso-ordinario-importacion-armas-municiones.module'
      ).then((m) => m.PermisoOrdinarioImportacionArmasMunicionesModule),
  },
  {
    path: 'permiso-ordinario-exportacion-explosivo',
    loadChildren: () =>
      import(
        './tramites/240121/permiso-ordinario-exportacion-explosivo.module'
      ).then((m) => m.PermisoOrdinarioExportacionExplosivoModule),
  },
  {
    path: 'permiso-exportacion-pirotecnia',
    loadChildren: () =>
      import(
        './tramites/240120/permiso-exportacion-pirotecnia.module'
      ).then((m) => m.PermisoExportacionPirotecniaModule),
  },
{
    path: 'permiso-extraordinario-importacion-armamento-fisicas-morales',
    loadChildren: () =>
      import(
        './tramites/240102/permiso-extraordinario-importacion-armamento-fisicas-morales.module'
      ).then(
        (m) => m.PermisoExtraordinarioImportacionArmamentoFisicasMoralesModule
      ),
  },
  {
    path: 'sustancias-quimicas',
    loadChildren: () =>
      import(
        './tramites/240107/aviso-importacion-sustancias-quimicas.module'
      ).then((m) => m.AvisoImportacionSustanciasQuimicasModule),
  },{
    path: 'permiso-ordinario',
    loadChildren: () =>
      import(
        './tramites/240308/solicitude-de-artificios-pirotecnicos.module'
      ).then((m) => m.SolicitudeDeArtificiosPirotecnicosModule),
  },
    {
    path: 'importacion-de-sustancias',
    loadChildren: () =>
      import(
        './tramites/240105/importacion-de-material-explosivo.module'
      ).then((m) => m.ImportacionDeMaterialExplosivoModule),
  },{
    path: 'permiso-ordinario-importacion-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240114/armas-municiones-para-la-gente.module'
      ).then((m) => m.ArmasMunicionesParaLaGenteModule),
  },
  {
    path: 'aviso-importacion-sustancias-quimicas',
    loadChildren: () =>
      import(
        './tramites/240106/aviso-importacion-sustancias-quimicas.module'
      ).then((m) => m.AvisoImportacionSustanciasQuimicasModule),
  },
  {
    path: 'importacion-de-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240111/importacion-de-material-explosivo.module'
      ).then((m) => m.ImportacionDeMaterialExplosivoModule),
  },
    {
      path: 'artefactos-pirotecnicos-ordinarios',
      loadChildren: () =>
        import(
          './tramites/240119/artefactos-pirotecnicos-ordinarios.module'
        ).then((m) => m.ArtefactosPirotecnicosOrdinariosModule),
    },
    {
      path: 'armas-municiones-para-la-gente',
      loadChildren: () =>
        import(
          './tramites/240114/armas-municiones-para-la-gente.module'
        ).then((m) => m.ArmasMunicionesParaLaGenteModule),
    },
  {
    path: 'permiso-ordinario-exportacion-de-sustancias-quimicas',
    loadChildren: () =>
      import(
      './tramites/240117/permiso-ordinario-para-la-exportacion-de-sustancias-quimicas.module'
      ).then((m) => m.PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasModule),
  },
  {
    path: 'permiso-ordinario',
    loadChildren: () =>
      import(
        './tramites/240311/solicitude-de-artificios-pirotecnicos.module'
      ).then((m) => m.SolicitudeDeArtificiosPirotecnicosModule),
  },
  {
    path: 'permiso-ordinario-prorroga-importacion-material-explosivo',
    loadChildren: () =>
      import(
        './tramites/240411/permiso-ordinario-prorroga-importacion-material-explosivo.module'
      ).then(
        (m) => m.PermisoOrdinarioProrrogaImportacionMaterialExplosivoModule
      ),
  },
  {
    path: 'permiso-extraordinario-exportacion-explosivo',
    loadChildren: () =>
      import(
      './tramites/240122/permiso-extraordinario-exportacion-explosivo.module'
      ).then((m) => m.PermisoExtraordinarioExportacionExplosivoModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
