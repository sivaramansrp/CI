import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NgModule } from '@angular/core';

export const ROUTES_AUTH: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: 'login',
        component: AuthPageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
