import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';

const ROUTES: Routes = [
  {
    path: 'sanitario',
    component: SanitarioComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sanitario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoSanitarioImportacionRoutingModule { }
