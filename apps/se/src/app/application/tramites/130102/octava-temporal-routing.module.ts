import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OctavaTemporalComponent } from './pages/octava-temporal/octava-temporal.component';

const routes: Routes = [
  {
      path: 'solicitante',
      component: OctavaTemporalComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class OctavaTemporalRoutingModule { }
