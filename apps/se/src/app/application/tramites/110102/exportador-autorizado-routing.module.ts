import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './pages/datos/datos.component';

const routes: Routes = [
  {
    path:'datos',
    component:DatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportadorautorizadoRoutingModule { }
