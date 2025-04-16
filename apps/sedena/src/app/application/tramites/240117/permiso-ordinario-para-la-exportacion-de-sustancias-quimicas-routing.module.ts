import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
      path: 'contenedor-de-pasos',
      component: SolicitudPageComponent,
    },
  
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'contenedor-de-pasos',
    },
    // {
    //   path: 'agregar-datos-mercancia',
    //   component: DatosMercanciaContenedoraComponent,
    // },
    // {
    //   path: 'agregar-destino-final',
    //   component: AgregarDestinatarioFinalContenedoraComponent,
    // },
    // {
    //   path: 'agregar-proveedor',
    //   component: AgregarProveedorContenedoraComponent,
    // },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule { }
