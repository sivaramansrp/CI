import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudProrrogaRoutingModule } from './solicitud-prorroga-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { CertificadoKimberleyComponent } from './components/certificado-kimberley/certificado-kimberley.component';


@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    SolicitudProrrogaRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    SolicitudComponent,
    DatosDelTramiteComponent,
    PartidasDeLaMercanciaComponent,
    CertificadoKimberleyComponent
  ],
})
export class SolicitudProrrogaModule {}
