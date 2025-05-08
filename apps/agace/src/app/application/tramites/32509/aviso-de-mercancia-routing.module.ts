import { RouterModule, Routes } from '@angular/router';
import { DestructionODonacionComponent } from './pages/destruccion-o-donacion/destruction-o-donacion.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'desrtrucion-o-donacion',
    component: DestructionODonacionComponent,
  },
  {
    path: '',
    redirectTo: 'desrtrucion-o-donacion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoDeMercanciaRoutingModule { }
