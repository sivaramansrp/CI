
import { ModificacionPermisoSanitarioComponent } from './pages/modificacion-permiso-sanitario/modificacion-permiso-sanitario.component';

import { NgModule } from '@angular/core';

import {RouterModule , Routes} from '@angular/router';
const ROUTES: Routes = [
   {
      path: 'solicitante',
      component: ModificacionPermisoSanitarioComponent,
    }
   
  
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModificacionPermisoSanitarioRoutingModule { }
