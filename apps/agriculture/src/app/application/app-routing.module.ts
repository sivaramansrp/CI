import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pantallas-extraordinarios' },
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
    path: 'importacion-acuacultura',
    loadChildren: () =>
      import('./tramites/220203/importacion-de-acuicultura.module').then(
        (m) => m.ImportacionDeAcuiculturaModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
