import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarCertificadoRoutingModule } from './validar-certificado-routing.module';
import { CamCertificadoComponent } from './page/cam-certificado/cam-certificado.component';
import { PasoUnoComponent } from './page/paso-uno/paso-uno.component';
import { PasoDosComponent } from './page/paso-dos/paso-dos.component';
import { BtnContinuarComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [
    CamCertificadoComponent,
    PasoUnoComponent,
    PasoDosComponent,
  ],
  imports: [
    CommonModule,
    ValidarCertificadoRoutingModule,
    SharedModule,
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
  ]
})
export class ValidarCertificadoModule { }
