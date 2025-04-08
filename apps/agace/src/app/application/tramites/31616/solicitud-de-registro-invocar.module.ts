import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudDeRegistroInvocarRoutingModule } from './solicitud-de-registro-invocar-routing.module';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';
import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [SolicitudPasoComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    SolicitudDeRegistroInvocarRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent
  ],
})
export class SolicitudDeRegistroInvocarModule {}
