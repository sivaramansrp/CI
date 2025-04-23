import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, InputFechaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from '../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';
import { DatosCertificadoDeComponent } from '../../shared/components/datos-certificado-de/datos-certificado-de.component';
import { DatosDelDestinatarioComponent } from '../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../shared/components/destinatario/destinatario.component';
import { MercanciaComponent } from './components/mercancia/mercancia.component';
import { PasoDosComponent } from './page/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './page/paso-uno/paso-uno.component';
import { PeruCertificadoComponent } from './page/peru-certificado/peru-certificado.component';
import { PeruDatosCertificadoComponent } from './components/peru-datos-certificado/peru-datos-certificado.component';
import { PeruDestinatarioComponent } from './components/peru-destinatario/peru-destinatario.component';
import { PeruHistoricoProductoresComponent } from './components/peru-historico-productores/peru-historico-productores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidarCertificadoRoutingModule } from './validar-certificado-routing.module';






@NgModule({
  declarations: [
    PeruCertificadoComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CertificadoOrigenComponent,
    MercanciaComponent,
    PeruDatosCertificadoComponent,
    PeruDestinatarioComponent,
    PeruHistoricoProductoresComponent,
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
