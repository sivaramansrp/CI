import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionModuloComponent } from './seleccion-modulo/seleccion-modulo.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-seleccion-modulo' },
  {
    path: 'app-seleccion-modulo',
    component: SeleccionModuloComponent
  },
  {
    path: 'operacion-funcionario',
    loadChildren: () =>
      import('./components/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
