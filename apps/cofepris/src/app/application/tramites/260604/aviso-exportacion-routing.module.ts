import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
// import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';

const ROUTES: Routes = [
  {
    path: 'pantallas',
    component: ContenedorDePasosComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pantallas',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoExportacionRoutingModule { 


}
