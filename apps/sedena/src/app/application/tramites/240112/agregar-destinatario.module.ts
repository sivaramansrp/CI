import { AgregarDestinatarioRoutingModule } from './agregar-destinatario-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
@NgModule({
  declarations: [SolicitudPageComponent],
  imports: [CommonModule, AgregarDestinatarioRoutingModule],
})
export class AgregarDestinatarioModule {}
