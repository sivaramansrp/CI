import { RouterModule, Routes } from '@angular/router';
import { AvisoRetornoComponent } from './pages/aviso-retorno/aviso-retorno.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [ 
    {
      path: 'primera-subsecuente',
      component: AvisoRetornoComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoRetornoRoutingModule { }
