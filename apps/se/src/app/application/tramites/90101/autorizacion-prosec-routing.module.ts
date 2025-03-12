import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProsecComponent } from './pages/prosec/prosec.component';

const ROUTES: Routes = [
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
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AutorizacionProsecRoutingModule { }