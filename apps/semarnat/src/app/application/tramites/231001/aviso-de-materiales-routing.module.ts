/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { DatosComponent } from './pages/datos/datos.component'; 

const ROUTES: Routes = [ 
    {
      path: 'datos',
      component: DatosComponent,

    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisodematerialesRoutingModule { }
