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
    path: 'acuicola-fisica',
    loadChildren: () =>
      import('./tramites/220703/acuicola-fisica.module').then(
        (m) => m.AcuicolaFisicaModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
