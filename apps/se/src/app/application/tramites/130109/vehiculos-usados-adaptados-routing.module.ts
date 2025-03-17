import { RouterModule, Routes } from '@angular/router';
import { CargerArchivoComponent } from './components/carger-archivo/carger-archivo.component';
import { ModificarPartidaComponent } from './components/modificar-partida/modificar-partida.component';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';



export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'vehiculos-usados-adaptados',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vehiculos-usados-adaptados',
  },
  { path: 'carger-archivo', component: CargerArchivoComponent },
  { path: 'modificar-partida', component: ModificarPartidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class VehiculosUsadosAdaptadosRoutingModule {}