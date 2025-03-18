import { RouterModule, Routes } from '@angular/router';
import { ComplementarFraccionVistaComponent } from './component/complementar-fraccion-vista/complementar-fraccion-vista.component';
import { ContenedorComplementarPlantasComponent } from './component/contenedor-complementar-plantas/contenedor-complementar-plantas.component';
import { ContenedorProveedorClienteComponent } from './component/contenedor-proveedor-cliente/contenedor-proveedor-cliente.component';
import { NgModule } from '@angular/core';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';
import { ProveedorPorArchivoVistaComponent } from './component/proveedor-por-archivo-vista/proveedor-por-archivo-vista.component';
import { ProyectoImmexVistaComponent } from './component/proyecto-immex-vista/proyecto-immex-vista.component';

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

    path: 'proyecto-immex',
    component: ProyectoImmexVistaComponent
  },
  {
    path: 'proveedor-por-archivo',
    component: ProveedorPorArchivoVistaComponent
  },
  {
    path: 'contenedor-proveedor-cliente',
    component: ContenedorProveedorClienteComponent,
  },
  {
    path: 'complementar-plantas',
    component: ContenedorComplementarPlantasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class NuevoProgramaIndustrialRoutingModule { }
