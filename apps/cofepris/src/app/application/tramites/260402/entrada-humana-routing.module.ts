import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EntradaHumanaComponent } from './pages/entrada-humana/entrada-humana.component';

const ROUTES:Routes = [
  {
    path:'solictud',
    component:EntradaHumanaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EntradaHumanaRoutingModule { }
