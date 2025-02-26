import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DePruebasComponent } from './pages/de-pruebas/de-pruebas.component';

const routes: Routes = [
  {
      path: 'solicitante',
      component: DePruebasComponent,
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DePruebasRoutingModule { }
