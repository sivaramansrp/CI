import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FloraFaunaComponent } from './pages/flora-fauna/flora-fauna.component';

const ROUTES: Routes = [
  {
    path:'solicitud',
    component:FloraFaunaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FloraFaunaRoutingModule{}