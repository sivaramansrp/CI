import { DiamanteBrutoComponent } from './pages/diamante-bruto/diamante-bruto.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
const ROUTES: Routes = [
  {
    path: 'diamante',
    component: DiamanteBrutoComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'diamante',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DiamanteBrutoRoutingModule { }
