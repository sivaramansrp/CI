import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DiamanteBrutoComponent } from './pages/diamante-bruto/diamante-bruto.component';

const ROUTES: Routes = [
  {
    path: 'diamante',
    component: DiamanteBrutoComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'diamante',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DiamanteBrutoRoutingModule { }
