import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './pages/page/page.component';

const ROUTES: Routes = [
  {
    path: 'page',
    component: PageComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'datos',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RefProcedureRoutingModule { }
