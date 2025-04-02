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

@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    SolicitudProrrogaRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent
  ],
})
export class SolicitudProrrogaModule {}
