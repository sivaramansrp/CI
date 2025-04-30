import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudDespachoExportacionComponent } from './pages/solicitud-despacho-exportacion/solicitud-despacho-exportacion.component';
import { SolicitudDespachoExportacionRoutingModule } from './solicitud-despacho-exportacion-routing.module';
@NgModule({
  declarations: [
    SolicitudDespachoExportacionComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [CommonModule, SolicitudDespachoExportacionRoutingModule],
})
export class SolicitudDespachoExportacionModule {}
