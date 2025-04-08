import { RouterModule, Routes } from '@angular/router';
import { AvisoReciclajeComponent } from './pages/aviso-reciclaje/aviso-reciclaje.component';
import { DatosResiduosPeligrososComponent } from './components/datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [ 
    {
      path: 'datos',
      component: AvisoReciclajeComponent,
    },
    {
      path:'datos-residuos',
      component:DatosResiduosPeligrososComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoDeReciclajeRoutingModule { }
