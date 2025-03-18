import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [

   {
      path: 'registrar-solicitud',
      component: DatosComponent,
  
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'registrar-solicitud',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoImportacionMaquinasRoutingModule { }
