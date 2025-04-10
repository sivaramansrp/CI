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
    path: 'dispositivos-medicos-laboratorio',
    loadChildren: () =>
      import('./tramites/260218/importacion-dispositivos-mediocos-laboratorio.module').then(
        (m) => m.ImportacionDispositivosMedicosLaboratorioModule
      )
  },
  {
    path: 'permiso-maquila',
    loadChildren: () =>
      import('./tramites/260212/permiso-maquila.module').then(
        (m) => m.PermisoMaquilaModule
      ),
  },
  {
    path: 'consumo-personal',
    loadChildren: () =>
      import('./tramites/260102/consumo-personal.module').then(
        (m) => m.ConsumoPersonalModule
      ),
  },
  {
    path: 'permiso-sanitario-importacion-medicamentos',
    loadChildren: () =>
      import(
        './tramites/260204/permiso-sanitario-importacion-medicamentos.module'
      ).then((m) => m.PermisoSanitarioImportacionMedicamentosModule),
  },

  {
    path: 'aviso-exportacion',
    loadChildren: () =>
      import('./tramites/260604/aviso-exportacion.module').then(
        (m) => m.AvisoExportacionModule
      ),
  },
  {
    path: 'maquila-materias-primas',
    loadChildren: () =>
      import('./tramites/260206/maquila-materias-primas.module').then(
        (m) => m.MaquilaMateriasPrimasModule
      ),
  },
  {
    path: 'permiso-plaguicidas',
    loadChildren: () =>
      import('./tramites/260501/permiso-plaguicidas-importacion.module').then(
        (m) => m.PermisoPlaguicidasImportacionModule
      ),
  },
  {
    path: 'permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260211/permiso-sanitario.module').then(
        (m) => m.PermisoSanitarioModule
      ),
  },
  {
    path: 'importacion-psicotropicos',
    loadChildren: () =>
      import(
        './tramites/260303/certificados-licencias-permisos/certificados-licencias-permisos.module'
      ).then((m) => m.CertificadosLicenciasPermisosModule),
  },
  {
    path: 'importacion-dispositivos-medicos-uso',
    loadChildren: () =>
      import(
        './tramites/260214/importacion-dispositivos-medicos-uso.module'
      ).then((m) => m.ImportacionDispositivosMedicosUsoModule),
  },
  {
    path: 'permiso-sanitario-importacion',
    loadChildren: () =>
      import('./tramites/260215/permiso-sanitario-importacion.module').then(
        (m) => m.PermisoSanitarioImportacionModule
      ),
  },
  {
    path: 'permiso-certificados',
    loadChildren: () =>
      import('./tramites/260701/certificados/certificados.module').then(
        (m) => m.CertificadosModule),
  },
  {
    path: 'permiso-importacion-biologica',
    loadChildren: () =>
      import('./tramites/260402/permiso-importacion-biologica.module').then(
        (m) => m.EntradaHumanaModule
      ),
  },
  {
    path: 'permiso-sanitario-medicos-uso-personal',
    loadChildren: () =>
      import(
        './tramites/260213/permiso-sanitario-medicos-uso-personal.module'
      ).then((m) => m.PermisoSanitarioMedicosUsoPersonalModule),
  },
  {
    path: 'permiso-sanitario-importacion-medicamentos-pruebas',
    loadChildren: () =>
      import(
        './tramites/260210/permiso-sanitario-importacion-medicamentos-pruebas.module'
      ).then((m) => m.PermisoSanitarioImportacionMedicamentosPruebasModule),
  },
  {
    path: 'aviso-de-modificacion-module',
    loadChildren: () =>
      import('./tramites/260605/pantallas.module').then(
        (m) => m.Pantallas260605Module
      ),
  },
  {
    path: 'importacion-productos',
    loadChildren: () =>
      import('./tramites/260101/importacion-productos.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'aviso-sanitario',
    loadChildren: () =>
      import('./tramites/260601/aviso-sanitario.module').then(
        (m) => m.AvisoSanitarioModule
      ),
  },

  {
    path: 'dispositivos-medicos-sin-registrar',
    loadChildren: () =>
      import('./tramites/260217/importacion-dispositivos-medicos-sin-registrar.module').then(
        (m) => m.ImportacionDispositivosMedicosSinRegistrarModule
      ),
  },

  {
    path: 'materias-primas-destinados',
    loadChildren: () =>
      import('./tramites/260205/materias-primas-destinados.module').then(
        (m) => m.MateriasPrimasDestinadosModule
      ),
  },
  {
    path: 'importacion-dispositivos-medicos-donacion',
    loadChildren: () =>
      import(
        './tramites/260216/importacion-dispositivos-medicos-donacion.module'
      ).then((m) => m.ImportacionDispositivosMedicosDonacionModule),
  },

  {
    path: 'territorio-nacional',
    loadChildren: () =>
      import('./tramites/260401/territorio-nacional-solicitude.module').then(
        (m) => m.TerritorioNacionalSolicitudeModule
      ),
  },
  {
    path: 'medicamentos-registro-sanitario',
    loadChildren: () =>
      import(
        './tramites/260203/permiso-sanitario-importacion-medicamentos.module'
      ).then((m) => m.PermisoSanitarioImportacion260203Module),
  },
  {
    path: 'permiso-experimentales-plaguicidas',
    loadChildren: () =>
      import(
        './tramites/260503/permiso-experimentales-plaguicidas.module'
      ).then((m) => m.PermisoExperimentalesPlaguicidasModule),
  },
  {
    path: 'retiros-cofepris',
    loadChildren: () =>
      import('./tramites/261702/retiros-cofepris.module').then(
        (m) => m.RetirosCofeprisModule
      ),
  },
  {
    path: 'muestras-plaguicidas',
    loadChildren: () =>
      import('./tramites/260502/muestras-plaguicidas.module').then(
        (m) => m.MuestrasPlaguicidasModule
      ),
  },
  {
    path: 'modificacion-permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260906/modificacion-permiso-sanitario.module').then(
        (m) => m.ModificacionPermisoSanitarioModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
