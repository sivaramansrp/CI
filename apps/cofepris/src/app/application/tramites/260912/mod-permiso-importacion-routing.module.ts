import { RouterModule, Routes } from '@angular/router';
import { AgregarDestinatarioFinalContenedoraComponent } from './component/agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarFabricanteContenedoraComponent } from './component/agregar-fabricante-contenedora/agregar-fabricante-contenedora.component';
import { AgregarFacturadorContenedoraComponent } from './component/agregar-facturador-contenedora/agregar-facturador-contenedora.component';
import { AgregarProveedorContenedoraComponent } from './component/agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
import { NgModule } from '@angular/core';
import { PermisoSanitarioComponent } from './pages/permiso-sanitario/permiso-sanitario.component';


const ROUTES: Routes = [
  {
    path: 'permiso-sanitario',
    component: PermisoSanitarioComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'permiso-sanitario',
  },
   {
    path: 'agregar-fabricante',
    component: AgregarFabricanteContenedoraComponent,
  },
  {
    path: 'agregar-destinatario-final',
    component: AgregarDestinatarioFinalContenedoraComponent,
  },
  {
    path: 'agregar-proveedor',
    component: AgregarProveedorContenedoraComponent,
  },
  {
    path: 'agregar-facturador',
    component: AgregarFacturadorContenedoraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroComoEmpresaRoutingModule { }
