import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreccionInternaDeLaCofeprisComponent } from './pages/correccion-interna-de-la-cofepris/correccion-interna-de-la-cofepris.component';

const routes: Routes = [
  {
      path: 'correccion-interna-de-la-cofepris',
      component: CorreccionInternaDeLaCofeprisComponent,
     },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorreccionInternaDeLaCofeprisRoutingModule { }
