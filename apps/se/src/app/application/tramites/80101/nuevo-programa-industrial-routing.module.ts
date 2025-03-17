import { RouterModule, Routes } from '@angular/router';
import { ComplementarFraccionVistaComponent } from './component/complementar-fraccion-vista/complementar-fraccion-vista.component';
import { ContenedorProveedorClienteComponent } from './component/contenedor-proveedor-cliente/contenedor-proveedor-cliente.component';
import { NgModule } from '@angular/core';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'action',
  },
  {
    path: 'action',
    component: PasoCapturarSolicitudComponent,
  },
  {
    path: 'complementar-fraccion',
    component: ComplementarFraccionVistaComponent,
  },
  {
    path: 'contenedor-proveedor-cliente',
    component: ContenedorProveedorClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class NuevoProgramaIndustrialRoutingModule { }
