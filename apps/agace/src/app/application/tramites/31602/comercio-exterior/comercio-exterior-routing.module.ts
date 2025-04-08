import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';

const ROUTES: Routes = [
  {
    path: 'registrar-solicitud',
    component: TodospasosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ComercioExteriorRoutingModule { }
