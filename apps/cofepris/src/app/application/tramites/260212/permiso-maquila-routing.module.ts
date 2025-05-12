import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisoMaquilaComponent } from './pages/permiso-maquila/permiso-maquila.component';

const routes: Routes = [
  {
    path:'solictud',
    component:PermisoMaquilaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoMaquilaRoutingModule { }
