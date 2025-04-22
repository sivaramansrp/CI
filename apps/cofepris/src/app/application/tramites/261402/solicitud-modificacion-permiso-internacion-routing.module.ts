import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolicitudModificacionPermisoInternacionComponent } from './pages/solicitud-modificacion-permiso-internacion/solicitud-modificacion-permiso-internacion.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudModificacionPermisoInternacionComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SolicitudModificacionPermisoInternacionRoutingModule { }
