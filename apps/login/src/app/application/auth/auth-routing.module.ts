import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NgModule } from '@angular/core';

export const ROUTES_AUTH: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
