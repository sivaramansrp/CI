import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoSanitarioImportacionRoutingModule { }
