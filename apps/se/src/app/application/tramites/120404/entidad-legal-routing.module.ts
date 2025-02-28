import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AsignciondirectaPageComponent } from './pages/asignciondirecta-page/asignciondirecta-page.component';

const routes: Routes = [

  {
        path: 'Soliciante',
        component: AsignciondirectaPageComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadLegalRoutingModule { }
