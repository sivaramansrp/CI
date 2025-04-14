import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermisoSanitarioComponent } from './pages/permiso-sanitario/permiso-sanitario.component';

const ROUTES: Routes = [
  {
    path: 'permiso-sanitario',
    component: PermisoSanitarioComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'permiso-sanitario',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroComoEmpresaRoutingModule { }
