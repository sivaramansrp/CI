import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports

import { PermisoSanitarioComponent } from './pages/permiso-sanitario/permiso-sanitario.component';

const ROUTES: Routes = [
  {
    path: 'permiso-sanitario',
    component: PermisoSanitarioComponent,

  },
  {
    path: '',
    redirectTo: 'sanitary-permit',
    pathMatch: 'full',
   
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModificacionDeDispositivosRoutingModule { }
