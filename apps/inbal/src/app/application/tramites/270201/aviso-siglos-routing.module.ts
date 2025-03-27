import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AvisoSiglosComponent } from './pages/aviso-siglos/aviso-siglos.component';

const ROUTES: Routes = [
  {
    path:'solictud',
    component:AvisoSiglosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoSiglosRoutingModule { }