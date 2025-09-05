import { AgregarFabricanteContenedoraComponent } from './components/agregar-fabricante-contenedora/agregar-fabricante-contenedora.component';

import { AgregarDestinatarioFinalContenedoraComponent } from './components/agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarProveedorContenedoraComponent } from './components/agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';

import { AgregarFacturadorContenedoraComponent } from './components/agregar-facturador-contenedora/agregar-facturador-contenedora.component';
import { ModPermisoSanitarioImportacion260904Component } from './pages/mod-permiso-sanitario-importacion-260904/mod-permiso-sanitario-importacion-260904.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
    {
      path: 'sanitary-permit',
      component: ModPermisoSanitarioImportacion260904Component,
  
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'sanitary-permit',
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
export class ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosRoutingModule { }
