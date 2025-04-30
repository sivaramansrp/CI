import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitudDespachoExportacionComponent } from './pages/solicitud-despacho-exportacion/solicitud-despacho-exportacion.component';
import { SolicitudDespachoExportacionRoutingModule } from './solicitud-despacho-exportacion-routing.module';

@NgModule({
  declarations: [SolicitudDespachoExportacionComponent],
  imports: [CommonModule, SolicitudDespachoExportacionRoutingModule],
})
export class SolicitudDespachoExportacionModule {}
