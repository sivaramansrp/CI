import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SolicitanteComponent, TercerosComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { CertificadoDeOrigenComponent } from './components/certificado-de-origen/certificado-de-origen.component';
import { DatosCertificadoComponent } from './components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    CatalogoSelectComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent,
    WizardComponent,
    PasoDosComponent,
   PasoTresComponent,    
    PasoUnoComponent,
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    TituloComponent

  ]
})
export class RegistroModule { }
