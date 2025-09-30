import { AlertComponent, BtnContinuarComponent, FirmaElectronicaComponent, PasoFirmaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CertificadoDeOrigenComponent } from './components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

@NgModule({
  declarations: [
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    SolicitudPageComponent],
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
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    PasoFirmaComponent
  ],
  schemas: [NO_ERRORS_SCHEMA], 
})
export class ReportesModule { }
