import { BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CamCertificadoComponent } from './page/cam-certificado/cam-certificado.component';
import { CommonModule } from '@angular/common';
import { DestinatarioComponent } from '../../shared/components/destinatario/destinatario.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './page/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './page/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidarCertificadoRoutingModule } from './validar-certificado-routing.module';


@NgModule({
  declarations: [
    CamCertificadoComponent,
    PasoDosComponent
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
    DestinatarioComponent,
    TituloComponent,
    PasoUnoComponent,
  ]
})
export class ValidarCertificadoModule { }
