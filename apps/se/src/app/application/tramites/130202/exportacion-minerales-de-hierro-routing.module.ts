import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { ExportacionMineralesDeHierroComponent } from './pages/exportacion-minerales-de-hierro/exportacion-minerales-de-hierro.component';

const routes: Routes = [
  {
    path: 'exportacion-mineralesde-hierro',
    component: ExportacionMineralesDeHierroComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'exportacion-mineralesDe-hierro'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportacionMineralesDeHierroRoutingModule { }
