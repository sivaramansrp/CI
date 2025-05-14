import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EnmiendaPermisoSanitarioComponent } from './pages/enmienda-permiso-sanitario/enmienda-permiso-sanitario.component';

const ROUTES: Routes = [
  {
    path:'solictud',
    component:EnmiendaPermisoSanitarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EnmiendaPermisoSanitarioRoutingModule { }
