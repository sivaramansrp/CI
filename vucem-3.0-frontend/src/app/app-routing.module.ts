import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/solicitud/servicios-extraordinarios'},
  {
    path: 'solicitud',
    loadChildren: () => import('./views/5701/solicitudes.module').then(m => m.SolicitudesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
