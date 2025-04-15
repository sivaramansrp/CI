import { AvisoModifyIvaEIepsComponent } from './pages/AvisoModifyIvaEIeps/AvisoModifyIvaEIeps.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

export const ROUTES_AVISO_MODIFY_IVAELEPS: Routes = [
  {
    path: 'aviso-modify',
     component: AvisoModifyIvaEIepsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aviso-modify',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AVISO_MODIFY_IVAELEPS)],
  exports: [RouterModule]
})
export class AvisoModifyIvaEIepsAgaceRoutingModule { }
