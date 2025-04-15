import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageComponent } from './pages/page/page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: PageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AutorizacionDeRayosXRoutingModule { }
