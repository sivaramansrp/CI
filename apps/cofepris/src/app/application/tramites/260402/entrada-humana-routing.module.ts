import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EntradaHumanaComponent } from './pages/entrada-humana/entrada-humana.component';

const routes: Routes = [
  {
    path:'solictud',
    component:EntradaHumanaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaHumanaRoutingModule { }
