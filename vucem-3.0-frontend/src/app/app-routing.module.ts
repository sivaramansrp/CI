import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '**', pathMatch: 'full', redirectTo: 'servicios-extraordinarios'},
  {
    path: 'servicios-extraordinarios',
    loadChildren: () => import('./tramites/5701/servicios-extraordinarios.module').then(m => m.ServiciosExtraordinariosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
