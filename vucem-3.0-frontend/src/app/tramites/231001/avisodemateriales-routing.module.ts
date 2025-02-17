import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosDelaComponent } from './components/datos-dela/datos-dela.component';

const routes: Routes = [
  {
      path: 'pantallas',
      component: PantallasComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'pantallas',
    },
    {
      path: 'DatosDela',
      component:DatosDelaComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisodematerialesRoutingModule { }
