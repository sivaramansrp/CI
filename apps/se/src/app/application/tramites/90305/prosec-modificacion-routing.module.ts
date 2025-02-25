
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProsecModificacionComponent } from './pages/prosec-modificacion/prosec-modificacion.component';


const routes: Routes = [
  {
      path: 'solicitante',
      component: ProsecModificacionComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProsecModificacionRoutingModule { }
