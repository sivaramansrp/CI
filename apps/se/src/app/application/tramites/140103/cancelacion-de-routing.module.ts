import { RouterModule, Routes } from '@angular/router';
import { CancelacionDeComponent } from './pages/cancelacion/cancelacion-de.component';
import { NgModule } from '@angular/core';
const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: CancelacionDeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
   exports: [RouterModule]
})
export class CancelacionDeRoutingModule { }
