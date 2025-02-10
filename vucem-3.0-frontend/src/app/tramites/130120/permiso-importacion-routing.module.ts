import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso/intro-permiso.component';

export const ROUTES_PERMISO: Routes = [
  {
    path: 'intro-permiso',
    component: IntroPermisoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'intro-permiso',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_PERMISO)],
  exports: [RouterModule]
})
export class PermisoImportacionRoutingModule { }
