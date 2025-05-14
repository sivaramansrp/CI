import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { NgModule } from '@angular/core';

export const ROUTES_AUTH: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'login-ejemplo',
    component: EjemploComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
