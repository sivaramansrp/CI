import { RouterModule, Routes } from '@angular/router';
import { CargarArchivoComponent } from './components/cargar-archivo/cargar-archivo.component';
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
  { path: 'carger-archivo', component: CargarArchivoComponent },
  { path: 'modificar-partida', component: ModificarPartidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class VehiculosUsadosAdaptadosRoutingModule {}