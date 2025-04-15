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
import { SolicitudDeRegistroInvocarService } from './services/solicitudDeRegistroInvocar/solicitud-de-registro-invocar.service';
import { ReprestantanteComponent } from './components/represtantante/represtantante.component';

@NgModule({
  declarations: [SolicitudPasoComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    SolicitudDeRegistroInvocarRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatoComunesComponent,
    AlertComponent,
    ReprestantanteComponent
  ],
  providers: [
    SolicitudDeRegistroInvocarService
  ]
})
export class SolicitudDeRegistroInvocarModule {}
