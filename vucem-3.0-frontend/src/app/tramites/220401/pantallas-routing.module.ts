import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const routes: Routes = [
  {
      path: 'solicitud',
      component: PantallasComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
