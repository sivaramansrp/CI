import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroPoblacionalRoutingModule } from './registro-poblacional-routing.module';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

@NgModule({
  declarations: [SolicitudPasoComponent, PasoUnoComponent, PasoDosComponent],
  imports: [CommonModule, RegistroPoblacionalRoutingModule],
})
export class RegistroPoblacionalModule {}
