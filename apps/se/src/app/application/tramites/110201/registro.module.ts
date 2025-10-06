import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
  PasoFirmaComponent,
  SharedModule,
  SolicitanteComponent,
  TercerosComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificadoDeOrigenComponent } from './components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { NgModule } from '@angular/core';
import { PasoCargaDocumentoComponent } from '@libs/shared/data-access-user/src';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    PasoTresComponent,
    PasoUnoComponent,
    SolicitudPageComponent,
  ],
  imports: [
    CommonModule,
    PasoCargaDocumentoComponent,
    AnexarDocumentosComponent,
    RegistroRoutingModule,
    CatalogoSelectComponent,
    AlertComponent,
    TituloComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent,
    WizardComponent,
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    PasoFirmaComponent,
    SharedModule,
  ],
  providers: [ToastrService]
})
export class RegistroModule { }
