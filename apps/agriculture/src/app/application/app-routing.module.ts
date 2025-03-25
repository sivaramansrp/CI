import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
