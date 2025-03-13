import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OctavaTemporalComponent } from './pages/octava-temporal/octava-temporal.component';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: OctavaTemporalComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class OctavaTemporalRoutingModule { }
