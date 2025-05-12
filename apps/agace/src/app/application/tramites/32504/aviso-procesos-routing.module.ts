import { RouterModule, Routes } from '@angular/router';
import { IntroAvisoComponent } from './pages/intro-aviso/intro-aviso.component';
import { NgModule } from '@angular/core';

export const ROUTES_AVISO: Routes = [
  {
    path: 'aviso-procesos',
    component: IntroAvisoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aviso-procesos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AVISO)],
  exports: [RouterModule]
})
export class AvisoProcesosRoutingModule { }
