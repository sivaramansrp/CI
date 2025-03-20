import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarInicalmenteRoutingModule } from './validar-inicalmente-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule, 
    ValidarInicalmenteRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    CertificadoOrigenComponent
    
  ],
})
export class ValidarInicalmenteModule {}
