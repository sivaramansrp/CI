import { RouterModule, Routes } from '@angular/router';
import { ComplementarFraccionVistaComponent } from './components/complementar-fraccion-vista/complementar-fraccion-vista.component';
import { ContenedorComplementarPlantasComponent } from './components/contenedor-complementar-plantas/contenedor-complementar-plantas.component';
import { ContenedorProveedorClienteComponent } from './components/contenedor-proveedor-cliente/contenedor-proveedor-cliente.component';
import { NgModule } from '@angular/core';
import { ProveedorPorArchivoVistaComponent } from './components/proveedor-por-archivo-vista/proveedor-por-archivo-vista.component';
import { ProyectoImmexVistaComponent } from './components/proyecto-immex-vista/proyecto-immex-vista.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
   {
      path: 'solicitud',
      component: SolicitudPageComponent,
    },
    {
      path: 'complementar-plantas',
      component: ContenedorComplementarPlantasComponent,
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
      path: '',
      pathMatch: 'full',
      redirectTo: 'solicitud',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AutorizacionProgrmaNuevoRoutingModule { }


