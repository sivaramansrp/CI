import { NgModule } from '@angular/core';
import { ProsecComponent } from './pages/prosec/prosec.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'prosec',
    component: ProsecComponent,
  },
  {
    path: '',
    redirectTo: 'prosec',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizacionProsecRoutingModule { }