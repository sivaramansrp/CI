import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitantePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ConcluirRelacionRoutingModule { }
