import { RouterModule, Routes } from '@angular/router';
import { ModificacionPermisoLabComponent } from './pages/modificacion-permiso-lab/modificacion-permiso-lab.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path:'modificacion-permiso-lab',
    component:ModificacionPermisoLabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModificacionPermisoLabRoutingModule { }
