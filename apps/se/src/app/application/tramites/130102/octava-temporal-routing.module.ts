import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';
import { OctavaTemporalComponent } from './pages/octava-temporal/octava-temporal.component';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: OctavaTemporalComponent,
    },
    {
        path: 'acuse',
        component: AcusePageComponent,
      }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class OctavaTemporalRoutingModule { }
