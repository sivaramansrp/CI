import { RouterModule, Routes } from '@angular/router';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { NgModule } from '@angular/core';

export const ROUTES_AVISO: Routes = [
  {
    path: 'aviso-procesos-solicitante',
    component: SolicitantePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aviso-procesos-solicitante',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AVISO)],
  exports: [RouterModule]
})
export class AvisoProcesosRoutingModule { }
