import { RouterModule, Routes } from '@angular/router';
import { AgregarDestinatarioFinalContenedoraComponent } from './components/agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component';
import { AgregarFabricanteContenedoraComponent } from './components/agregar-fabricante-contenedora/agregar-fabricante-contenedora.component';
import { AgregarFacturadorContenedoraComponent } from './components/agregar-facturador-contenedora/agregar-facturador-contenedora.component';
import { AgregarProveedorContenedoraComponent } from './components/agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
import { IniciarTramiteResolver } from '@libs/shared/data-access-user/src/core/resolvers/iniciar-tramite.resolver';
import { NgModule } from '@angular/core';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';


const ROUTES: Routes = [
  // {
  //   path: 'sanitario',
  //   component: SanitarioComponent,
  // },  
   {
    path: 'sanitario',
    component: SanitarioComponent,
    canActivate: [IniciarTramiteResolver],
        data: {
          iniciarConfig: {
            procedureId: '260215'
          }
        }
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
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sanitario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoSanitarioImportacionRoutingModule { }
