import {
  AlertComponent,
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatoComunesComponent } from './components/dato-comunes/dato-comunes.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PerfilesMensajeriaComponent } from './components/perfiles-mensajeria/perfiles-mensajeria.component';
import { ProfilesDomocilioDelaComponent } from './components/profiles-domocilio-dela/profiles-domocilio-dela.component';
import { ReprestantanteComponent } from './components/represtantante/represtantante.component';
import { SolicitudDeRegistroInvocarRoutingModule } from './solicitud-de-registro-invocar-routing.module';
import { SolicitudDeRegistroInvocarService } from './services/solicitudDeRegistroInvocar/solicitud-de-registro-invocar.service';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';

@NgModule({
  declarations: [SolicitudPasoComponent, PasoUnoComponent],
  imports: [
    AlertComponent,
    CommonModule,
    SolicitudDeRegistroInvocarRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatoComunesComponent,
    ReprestantanteComponent,
    PerfilesMensajeriaComponent,
    ProfilesDomocilioDelaComponent,
  ],
  providers: [
    SolicitudDeRegistroInvocarService
  ]
})
export class SolicitudDeRegistroInvocarModule {}
