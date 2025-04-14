import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/Pantallas/Pantallas.component';
const ROUTES: Routes = [
{
  path: '', pathMatch: 'full', redirectTo: 'pantallaspage' },
  { 
    path: 'pantallaspage',
    component: PantallasComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoDeImportacionRoutingModule { }
