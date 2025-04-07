import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitudModificacionPermisoSalidaTerritorioRoutingModule } from './solicitud-modificacion-permiso-salida-territorio-routing.module';
import { SolicitudModificacionPermisoSalidaTerritorioComponent } from './pages/solicitud-modificacion-permiso-salida-territorio/solicitud-modificacion-permiso-salida-territorio.component';

@NgModule({
  declarations: [SolicitudModificacionPermisoSalidaTerritorioComponent],
  imports: [
    CommonModule,
    SolicitudModificacionPermisoSalidaTerritorioRoutingModule,
  ],
})
export class SolicitudModificacionPermisoSalidaTerritorioModule {}
