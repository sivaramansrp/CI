import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';



import { CancelacionDeComponent } from './pages/cancelacion/cancelacion-de.component';


const routes: Routes = [
  {
      path: 'solicitante',
      component: CancelacionDeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class CancelacionDeRoutingModule { }
