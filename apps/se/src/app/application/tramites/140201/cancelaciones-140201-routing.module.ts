import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { Cancelaciones140201Component } from './pages/cancelaciones-140201/cancelaciones-140201.component';

const ROUTES: Routes = [
    {
      path: 'solicitute',
      component:Cancelaciones140201Component ,
    },
   
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class Cancelaciones140201RoutingModule { }
