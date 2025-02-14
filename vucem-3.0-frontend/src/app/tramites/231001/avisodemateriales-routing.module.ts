/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';

const routes: Routes = [
  {
      path: 'pantallas',
      component: PantallasComponent,
    },
    {
      path: 'datos',
      component: DatosComponent,

    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'pantallas',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisodematerialesRoutingModule { }
