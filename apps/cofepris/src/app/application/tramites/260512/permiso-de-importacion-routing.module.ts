import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PaginasComponent } from './pages/paginas/paginas.component';
const ROUTES: Routes = [
{
  path: '', pathMatch: 'full', redirectTo: 'pantallaspage' },
  { 
    path: 'pantallaspage',
    component: PaginasComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoDeImportacionRoutingModule { }
