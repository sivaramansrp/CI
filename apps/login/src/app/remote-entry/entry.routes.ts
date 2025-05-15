import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: () => import('./../auth/auth.module').then(module => module.AppLoginModule)
  }
]; 
@NgModule({
    imports: [RouterModule.forRoot(ROUTES), RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }