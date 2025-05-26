import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MantenimientoCuentaComponent } from './mantenimiento-cuenta/mantenimiento-cuenta.component';
import { NgModule } from '@angular/core';

export const ROUTES_AUTH: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'mantenimiento-cuenta',
    component: MantenimientoCuentaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
