import { Route } from '@angular/router';

export const REMOTEROUTES: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: () => import('./../auth/auth.module').then(module => module.AuthModule)
  }
]; 
@NgModule({
    imports: [RouterModule.forRoot(ROUTES), RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }