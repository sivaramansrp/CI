import { AlertComponent, AnexarDocumentosComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SolicitanteComponent, TercerosComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CertificadoAlianzaPosterioriRoutingModule } from './certificado-alianza-posteriori-routing.module';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';

import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CertificadoAlianzaPosterioriRoutingModule,
    CatalogoSelectComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent,
    WizardComponent,
    PasoDosComponent,
    PasoUnoComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    TituloComponent,
  ],
  providers:[ToastrService]
})
export class CertificadoAlianzaPosterioriModule {}
