import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElegibilidadTextilesComponent } from './pages/elegibilidad-textiles/elegibilidad-textiles.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElegibilidadDeTextilesRoutingModule { }