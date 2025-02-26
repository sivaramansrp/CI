import { AgriculturaComponent } from './pages/agricultura/agricultura.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';



export const ROUTES_FITOSANITARIO: Routes = [
  {
    path: 'agricultura',
    component: AgriculturaComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'agricultura',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_FITOSANITARIO)],
  exports: [RouterModule]
})
export class FitosanitarioRoutingModule { }