import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosComponent } from './pages/datos/datos.component';


const routes: Routes = [
  {
      path: 'pantallas',
      component: PantallasComponent,
    },
    {
      path: 'Solicitante',
      component: SolicitanteComponent,
    },
   
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'Solicitante',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisodematerialesRoutingModule { }
