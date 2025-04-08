import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitudModificacionPermisoSalidaTerritorioComponent } from './pages/solicitud-modificacion-permiso-salida-territorio/solicitud-modificacion-permiso-salida-territorio.component';
import { SolicitudModificacionPermisoSalidaTerritorioRoutingModule } from './solicitud-modificacion-permiso-salida-territorio-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SolicitudModificacionPermisoSalidaTerritorioComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    SolicitudModificacionPermisoSalidaTerritorioRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    // PasoDosComponent,
    // PasoTresComponent,
    SolicitanteComponent,
  ],
})
export class SolicitudModificacionPermisoSalidaTerritorioModule {}
