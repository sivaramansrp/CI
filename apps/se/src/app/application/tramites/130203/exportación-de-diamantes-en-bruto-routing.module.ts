import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { ExportacionDeDiamantesEnBrutoComponent } from './pages/exportacion-de-diamantes-en-bruto/exportacion-de-diamantes-en-bruto.component';


const ROUTES: Routes = [
  {
    path: 'exportación-de-diamantes-en-bruto',
    component: ExportacionDeDiamantesEnBrutoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'exportación-de-diamantes-en-bruto'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExportaciónDeDiamantesEnBrutoRoutingModule { }
