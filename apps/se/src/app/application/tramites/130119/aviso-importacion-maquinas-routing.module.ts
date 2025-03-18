import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [

   {
      path: 'aviso-importacion-maquinas',
      component: DatosComponent,
  
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'datos',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoImportacionMaquinasRoutingModule { }
