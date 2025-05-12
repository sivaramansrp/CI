import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const ROUTES: Routes = [
  {
    path: 'modificar-caat-maritimo',
    component: PantallasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModificacionTransportacionMaritimaRoutingModule { }
