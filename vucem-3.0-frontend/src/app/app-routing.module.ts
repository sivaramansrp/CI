import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'servicios-extraordinarios',
    loadChildren: () =>
      import('./tramites/5701/servicios-extraordinarios.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'pantallas-extraordinarios',
    loadChildren: () =>
      import('./tramites/220401/pantallas.module').then(
        (m) => m.PantallasModule
      ),
  },
  { 
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/110101/pantallas/pantallas.module').then(
        (m) => m.PantallasModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
