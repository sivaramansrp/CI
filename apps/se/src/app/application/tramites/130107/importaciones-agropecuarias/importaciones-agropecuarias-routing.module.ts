import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';

const ROUTES: Routes = [
  {
    path: 'permisos-de-importacia',
    component: TodosPasosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ImportacionesAgropecuariasRoutingModule { }
