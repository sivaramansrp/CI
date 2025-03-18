import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';

const routes: Routes = [
  {
    path: 'solicitante',
    component: IntroPermisoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitante',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesistimientoDePermisoRoutingModule { }
