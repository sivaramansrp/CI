import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';

const routes: Routes = [
  {
      path: 'datosdecomponentes',
      component: PantallasComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

/**
 * Este módulo se utiliza para configurar las rutas del módulo 220401.
 * Importar las rutas del módulo.
 */ 
export class PantallasRoutingModule { }
