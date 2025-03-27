import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VehiculosUsadosAdaptadosComponent } from './pages/vehiculos-usados-adaptados/vehiculos-usados-adaptados.component';

const ROUTES: Routes = [
  {
    path: 'vehiculos-usados-adaptados',
    component :VehiculosUsadosAdaptadosComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'vehiculos-usados-adaptados'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class VehiculosUsadosAdaptadosRoutingModule {}