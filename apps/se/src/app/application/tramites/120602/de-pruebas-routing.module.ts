import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DePruebasComponent } from './pages/de-pruebas/de-pruebas.component';

// eslint-disable-next-line @typescript-eslint/naming-convention
const routes: Routes = [
  {
      path: 'datos-empresa',
      component: DePruebasComponent,
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DePruebasRoutingModule { }
