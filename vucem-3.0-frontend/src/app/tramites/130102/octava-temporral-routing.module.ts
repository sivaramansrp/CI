import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OctavaTemporralComponent } from './pages/octava-temporral/octava-temporral.component';

const routes: Routes = [
  {
      path: 'solicitante',
      component: OctavaTemporralComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class OctavaTemporralRoutingModule { }
