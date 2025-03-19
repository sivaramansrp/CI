import { RouterModule, Routes } from '@angular/router';
import { ElegibilidadTextilesComponent } from './pages/elegibilidad-textiles/elegibilidad-textiles.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'elegibilidad-textiles',
    component: ElegibilidadTextilesComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'elegibilidad-textiles',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ElegibilidadDeTextilesRoutingModule { }