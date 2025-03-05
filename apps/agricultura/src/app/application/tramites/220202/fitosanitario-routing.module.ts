import { AgricultureComponent } from './pages/agriculture/agriculture.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';



export const ROUTES_FITOSANITARIO: Routes = [
  {
    path: 'agriculture',
    component: AgricultureComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'agriculture',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_FITOSANITARIO)],
  exports: [RouterModule]
})
export class FitosanitarioRoutingModule { }