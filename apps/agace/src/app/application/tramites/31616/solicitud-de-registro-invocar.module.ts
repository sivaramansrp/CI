import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudDeRegistroInvocarRoutingModule } from './solicitud-de-registro-invocar-routing.module';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { DatoComunesComponent } from './components/dato-comunes/dato-comunes.component';

@NgModule({
  declarations: [SolicitudPasoComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    SolicitudDeRegistroInvocarRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatoComunesComponent,
    AlertComponent
  ],
})
export class SolicitudDeRegistroInvocarModule {}
