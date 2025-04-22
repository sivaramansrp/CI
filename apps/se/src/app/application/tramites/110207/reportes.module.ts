import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WizardComponent, BtnContinuarComponent, SolicitanteComponent, FirmaElectronicaComponent, AlertComponent, AnexarDocumentosComponent, TituloComponent, SharedModule } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from './components/certificado-de-origen/certificado-de-origen.component';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [PasoDosComponent,
      PasoTresComponent,
      PasoUnoComponent,SolicitudPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    WizardComponent,
    BtnContinuarComponent,
  ],
})
export class ReportesModule { }
