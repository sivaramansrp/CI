import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvisoDeReciclajeRoutingModule } from './aviso-de-reciclaje-routing.module';
import { AvisoReciclajeComponent } from './pages/aviso-reciclaje/aviso-reciclaje.component';
import { SolicitudDatosSolicitanteComponent } from './solicitud-datos-solicitante/solicitud-datos-solicitante.component';

@NgModule({
  declarations: [AvisoReciclajeComponent, SolicitudDatosSolicitanteComponent],
  imports: [
    CommonModule,
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    AvisoDeReciclajeRoutingModule,
  ],
})
export class AvisoDeReciclajeModule {}
