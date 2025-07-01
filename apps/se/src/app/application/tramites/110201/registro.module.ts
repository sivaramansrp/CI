import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
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
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    SolicitudPageComponent, AnexarDocumentosComponent,

  ],
  imports: [
    CommonModule,
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
    SharedModule,
  ],
  providers: [ToastrService]
})
export class RegistroModule { }
