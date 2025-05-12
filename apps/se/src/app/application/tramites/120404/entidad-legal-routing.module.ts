import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AsignciondirectaPageComponent } from './pages/asignciondirecta-page/asignciondirecta-page.component';

const ROUTES: Routes = [

  {
        path: 'soliciante',
        component: AsignciondirectaPageComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EntidadLegalRoutingModule { }
