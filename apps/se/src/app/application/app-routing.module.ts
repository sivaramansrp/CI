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
    path: 'octava-temporal',
    loadChildren: () =>
      import('./tramites/130102/octava-temporal.module').then(
        (m) => m.OctavaTemporalModule
      ),
  },
  {
    path: 'solicitartransferencia',
    loadChildren: () =>
      import('./tramites/120501/solicitar-transferencia-cupos.module').then(
        (m) => m.SolicitarTransferenciaCuposModule
      )
    },
  {
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/110101/pantallas/pantallas.module').then(
        (m) => m.Pantallas110101Module
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}