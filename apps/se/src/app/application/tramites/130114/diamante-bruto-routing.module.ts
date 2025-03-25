import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './pages/page/page.component';

const ROUTES: Routes = [
  {
    path: 'diamante',
    component: PageComponent,

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
