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
    path: 'pantallas-extraordinarios',
    loadChildren: () =>
      import('./tramites/220401/pantallas.module').then(
        (m) => m.PantallasModule
      ),
  },
  {
    path: 'certificado-zoosanitario',
    loadChildren: () =>
      import('./tramites/220201/certificado-zoosanitario.module').then(
        (m) => m.CertificadoZoosanitarioModule
      ),
  },
  {
    path: 'certificado-fitosanitario',
    loadChildren: () =>
      import('./tramites/220202/fitosanitario.module').then(
        (m) => m.FitosanitarioModule
      )
  },
  {

    path: 'sagarpa',
    loadChildren: () =>
      import('./tramites/220501/sagarpa.module').then(
        (m) => m.SagarpaModule
      ),
  },
  {
    path: 'inspeccion-fisica',
    loadChildren: () =>
      import('./tramites/220502/inspeccion-fisica.module').then(
        (m) => m.InspeccionFisicaModule
      ),
  },
  {
    path: 'importacion-acuacultura',
    loadChildren: () =>
      import('./tramites/220203/importacion-de-acuicultura.module').then(
        (m) => m.ImportacionDeAcuiculturaModule)
  },
  {
    path: 'pantallas-captura',
    loadChildren: () =>
      import('./tramites/220402/pantallas-captura.module').then(
        (m) => m.PantallasCapturaModule
      )
  },
  {
    path: 'desistimiento',
    loadChildren: () =>
      import('./tramites/220404/desistimiento.module').then(
        (m) => m.DesistimientoModule
      )
  },
  {
    path: 'inspeccion-fisica',
    loadChildren: () =>
      import('./tramites/220701/inspeccion-fisica-zoosanitario.module').then(
        (m) => m.InspeccionFisicaZoosanitarioModule
      )
  },
  {  
    path: 'peticion-requisitos-fitosanitarios',
    loadChildren: () =>
      import('./tramites/220102/fitosanitario.module').then(
        (m) => m.FitosanitarioModule
      )
  },
  {
    path: 'inspeccion-fitosanitario',
    loadChildren: () =>
      import('./tramites/220702/inspeccion-fitosanitario.module').then(
        (m) => m.InspeccionFitosanitarioModule
      ),
  },
  {
    path: 'certificado-exportacion',
    loadChildren: () =>
      import('./tramites/220403/exportaccion-acuicola.module').then(
      (m) => m.ExportaccionAcuicolaModule
      )
  },
  {

    path: 'acuicola-fisica',
    loadChildren: () =>
      import('./tramites/220703/acuicola-fisica.module').then(
        (m) => m.AcuicolaFisicaModule
      ),
  },
  { path: 'fitosanitario',
    loadChildren: () =>
      import('./tramites/221602/fitosanitario.module').then(
        (m) => m.FitosanitarioModule
      ),
  },
  { path: 'sanidad',
    loadChildren: () =>
      import('./tramites/221603/sanidad.module').then(
        (m) => m.SanidadModule
      ),
  },
  { path: 'zoosanitario',
    loadChildren: () =>
      import('./tramites/221601/zoosanitario-para-importacion.module').then(
        (m) => m.ZoosanitarioParaImportacionModule
      ),
  },
  { path: 'sanidadacuicola',
    loadChildren: () =>
      import('./tramites/220503/sanidad-acuicola.module').then(
        (m) => m.SanidadAcuicolaModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
