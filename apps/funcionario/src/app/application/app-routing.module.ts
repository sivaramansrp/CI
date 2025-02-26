import { BandejaTareasPendientesComponent } from './bandejaPendientes/bandeja-tareas-pendientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-bandeja-tareas-pendientes' },
  {
    path: 'app-bandeja-tareas-pendientes',
    component: BandejaTareasPendientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
