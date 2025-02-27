import { NgModule } from '@angular/core';
import { RenovacionesComponent } from './pages/renovaciones/renovaciones.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'renovaciones',
    component: RenovacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenovacionesMuestrasMercanciasRoutingModule {}
