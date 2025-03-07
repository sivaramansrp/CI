import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CertificadoTecnicoJaponRoutingModule } from './certificado-tecnico-japon-routing.module';

import { BtnContinuarComponent, SolicitanteComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import { WizardComponent } from '@libs/shared/data-access-user/src';

import { ValidarCertificadoTecnicoJaponComponent } from './pages/validar-certificado-tecnico-japon/validar-certificado-tecnico-japon.component';

import { AppSolicitanteTabsComponent } from './pages/app-solicitante-tabs/app-solicitante-tabs.component';
import { TratadosComponent } from './components/tratados/tratados.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';
import { DatosCertificadoComponent } from './components/datos-certificado/datos-certificado.component';


@NgModule({
  declarations: [
    ValidarCertificadoTecnicoJaponComponent,
    AppSolicitanteTabsComponent
  ],
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    CertificadoTecnicoJaponRoutingModule,
    TratadosComponent,
    TituloComponent,
    TransporteComponent,
    DestinatarioComponent,
    RepresentanteLegalComponent,
    DatosCertificadoComponent
    
  ]
})
export class CertificadoTecnicoJaponModule { }
