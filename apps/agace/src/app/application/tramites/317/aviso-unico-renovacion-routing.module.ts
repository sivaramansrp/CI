import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AvisoDeRenovacionComponent } from './components/aviso-de-renovacion/aviso-de-renovacion.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const ROUTES: Routes = [
    // {
    //   path: 'aviso-de-renovacion',
    //   component: AvisoDeRenovacionComponent,
    // },
    

    {
         path: 'pantallas',
        component: PantallasComponent,
       },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'aviso-de-renovacion',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoUnicoRenovacionRoutingModule { }
