import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDelSolicitudModificacionComponent } from '../../shared/components/datos-del-solicitud-modificacion/datos-del-solicitud-modificacion.component';
import { ModificacionPermisoLabComponent } from './pages/modificacion-permiso-lab/modificacion-permiso-lab.component';
import { ModificacionPermisoLabRoutingModule } from './modificacion-permiso-lab-routing.module';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/modificacion-permiso-lab/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/modificacion-permiso-lab/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/modificacion-permiso-lab/paso-uno/paso-uno.component';

@NgModule({
  declarations: [
    ModificacionPermisoLabComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    ModificacionPermisoLabRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatosDelSolicitudModificacionComponent
  ],
})
export class ModificacionPermisoLabModule {}
