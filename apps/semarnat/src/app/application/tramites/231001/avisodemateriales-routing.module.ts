/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { SolicitanteDatosTabsComponent } from './pages/solicitante-datos-tabs/solicitante-datos-tabs.component';

 import { DatosComponent } from './pages/datos/datos.component'; 

const routes: Routes = [
  /*{
    path: 'solicitud',
    component: SolicitanteDatosTabsComponent,
  }, 
  {
    path: 'datos',
    component: DatosComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'datos',
  }*/
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
      redirectTo: 'datos',
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisodematerialesRoutingModule { }
