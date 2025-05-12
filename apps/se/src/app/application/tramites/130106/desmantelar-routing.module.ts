import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DesmantelarComponent } from './pages/desmantelar/desmantelar.component';


const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: DesmantelarComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class DesmantelarRoutingModule { }
