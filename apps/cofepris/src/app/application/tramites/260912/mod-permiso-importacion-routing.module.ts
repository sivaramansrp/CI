import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports

import { SanitaryPermitComponent } from './pages/sanitary-permit/sanitary-permit.component';

const ROUTES: Routes = [
  {
    path: 'sanitary-permit',
    component: SanitaryPermitComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sanitary-permit',
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroComoEmpresaRoutingModule { }
