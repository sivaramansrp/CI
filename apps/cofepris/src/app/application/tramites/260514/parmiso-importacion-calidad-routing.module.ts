import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { Pantallas260514Component } from './pages/pantallas-260514/pantallas-260514.component';

const routes: Routes = [
  {
      path: 'pantallas',
      component: Pantallas260514Component,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParmisoImportacionCalidadRoutingModule { }
