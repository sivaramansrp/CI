import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, InputFechaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CamCertificadoComponent } from './page/cam-certificado/cam-certificado.component';
import { CamDatosCertificadoComponent } from './components/cam-datos-certificado/cam-datos-certificado.component';
import { CamDestinatarioComponent } from './components/cam-destinatario/cam-destinatario.component';
import { CertificadoDeOrigenComponent } from '../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';
import { DatosDelDestinatarioComponent } from '../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../shared/components/destinatario/destinatario.component';
import { MercanciaComponent } from './components/mercancia/mercancia.component';
import { PasoDosComponent } from './page/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './page/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidarCertificadoRoutingModule } from './validar-certificado-routing.module';
import { DatosCertificadoDeComponent } from '../../shared/components/datos-certificado-de/datos-certificado-de.component';


@NgModule({
  declarations: [
    CamCertificadoComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CertificadoOrigenComponent,
    MercanciaComponent,
    CamDatosCertificadoComponent,
    CamDestinatarioComponent
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
    CertificadoDeOrigenComponent,
    DatosCertificadoDeComponent,
    DatosDelDestinatarioComponent,
    DestinatarioComponent,
    TituloComponent
  ]
})
export class ValidarCertificadoModule { }
