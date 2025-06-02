import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';

const ROUTES: Routes = [
  {
    path:'solictud',
    component:PermisoMaquilaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoMaquilaRoutingModule { }
