import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarCertificadoRoutingModule } from './validar-certificado-routing.module';
import { CamCertificadoComponent } from './page/cam-certificado/cam-certificado.component';
import { PasoUnoComponent } from './page/paso-uno/paso-uno.component';
import { PasoDosComponent } from './page/paso-dos/paso-dos.component';
import { BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, InputFechaComponent, SharedModule, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';
import { MercanciaComponent } from './components/mercancia/mercancia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatosCertificadoComponent } from './components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { CertificadoDeOrigenComponent } from '../../shared/components/certificado-de-origen/certificado-de-origen.component';


@NgModule({
  declarations: [
    CamCertificadoComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CertificadoOrigenComponent,
    MercanciaComponent,
    DatosCertificadoComponent,
    DestinatarioComponent
  ],
  imports: [
    CommonModule,
    ValidarCertificadoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    CatalogoSelectComponent,
    RouterModule,
    InputFechaComponent,
    CertificadoDeOrigenComponent

  ]
})
export class ValidarCertificadoModule { }
