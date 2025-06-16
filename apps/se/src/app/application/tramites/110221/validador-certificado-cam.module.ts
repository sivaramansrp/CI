import { AlertComponent, AnexarDocumentosComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SolicitanteComponent, TercerosComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from './components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { ValidadorCertificadoCamRoutingModule } from './validador-certificado-cam-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ValidadorCertificadoCamRoutingModule,
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
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    TituloComponent
  ],
  providers:[ToastrService]
})
export class ValidadorCertificadoCamModule {}