import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TerritorioNacionalSolicitudeComponent } from './pages/territorio-nacional-solicitude/territorio-nacional-solicitude.component';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: TerritorioNacionalSolicitudeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TerritorioNacionalSolicitudeRoutingModule { }
