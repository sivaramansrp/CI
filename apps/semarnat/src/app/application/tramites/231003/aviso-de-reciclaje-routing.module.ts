import { RouterModule, Routes } from '@angular/router';
import { AvisoReciclajeComponent } from './pages/aviso-reciclaje/aviso-reciclaje.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [ 
    {
      path: 'datos',
      component: AvisoReciclajeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoDeReciclajeRoutingModule { }
