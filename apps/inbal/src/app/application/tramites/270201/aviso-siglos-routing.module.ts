import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AvisoSiglosComponent } from './pages/aviso-siglos/aviso-siglos.component';

const routes: Routes = [
  {
    path:'solictud',
    component:AvisoSiglosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoSiglosRoutingModule { }