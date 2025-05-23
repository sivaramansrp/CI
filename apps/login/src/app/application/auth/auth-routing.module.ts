import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { NgModule } from '@angular/core';

export const ROUTES_AUTH: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'cambio-contrasena',
    component: CambioContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
